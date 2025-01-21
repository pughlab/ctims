import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import useGetMatchResults from '../../hooks/useGetMatchResults';
import useDownloadResults from '../../hooks/useDownloadResults';
import { classNames } from 'primereact/utils';
import styles from './Results.module.scss';
import {DataTable, DataTableSortMeta} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CSVLink } from "react-csv";
import {TrialStatusEnum} from "../../../../libs/types/src/trial-status.enum";
import { setIsLongOperation } from 'apps/web/store/slices/contextSlice';
import { useDispatch } from 'react-redux';
import { Paginator } from 'primereact/paginator';

const Results = (props: {trials: [], getTrialsForUsersInGroupLoading: boolean}) => {
  const {data, status: sessionStatus} = useSession()
  const dispatch = useDispatch();

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  useEffect(() => {
    if (!data) {
      return;
    }
  }, [data])

  useEffect(() => {
    if (props.trials && props.trials.length > 0) {
      getMatchResultsOperation(props.trials);
    } else {
      setResults([])
    }
  }, [props.trials]);

  // retrieve trial match results
  const {
    response: getMatchResultsResponse,
    error: getMatchResultsError,
    loading: getMatchResultsLoading,
    getMatchResultsOperation
  } = useGetMatchResults();

  // retrieve results csv
  const {
    response: getDownloadResultsResponse,
    error: getDownloadResultsError,
    loading: getDownloadResultsLoading,
    getDownloadResultsOperation
  } = useDownloadResults();

  useEffect(() => {
    if (getMatchResultsResponse) {
      const processedData = postProcess(getMatchResultsResponse);
      setResults(processedData);
    }
  }, [getMatchResultsResponse])

  useEffect(() => {
    if (getDownloadResultsResponse) {
      setResultFileName(trialSelected.trialId + '_result.csv');
      const processedData = postProcessCSVData(getDownloadResultsResponse);
      setDownloadResults(processedData);
      dispatch(setIsLongOperation(false));
    }
  }, [getDownloadResultsResponse])

  const [downloadResults, setDownloadResults] = useState<any>([]);
  useEffect(() => {
    if (downloadResults.length > 0 && csvLink.current) {
      csvLink.current.link.click();
    }
  }, [downloadResults])

  // match results use effects
  const [results, setResults] = useState<any>([]);
  // trial that was clicked
  const [trialSelected, setTrialSelected] = useState<any>(null);
  // result download file name
  const [resultFileName, setResultFileName] = useState<string>('');

  const [multiSortMeta, setMultiSortMeta] = useState<DataTableSortMeta[]>([
    { field: 'createdAt', order: -1 }, // Default sort by "Created At" descending
  ]);

  const headers = [
    {label: "Trial Id", key: "trialId"},
    {label: "Nickname", key: "nickname"},
    {label: "Short Title", key: "short_title"},
    {label: "Trial Match Date", key: "matchDate"},
    {label: "Step Number", key: "trial_step_number"},
    {label: "Arm Code", key: "code"},
    {label: "Arm Number", key: "trial_arm_number"},
    {label: "Study ID", key: "study_id"},
    {label: "Patient ID", key: "patient_id"},
    {label: "Sample ID", key: "sample_id"},
    {label: "Vital Status", key: "vital_status"},
    {label: "Gender", key: "gender"},
    {label: "Age", key: "age"},
    {label: "Diagnosis", key: "oncotree_primary_diagnosis_name"},
    {label: "HER2 Status", key: "her2_status"},
    {label: "ER Status", key: "er_status"},
    {label: "PR Status", key: "pr_status"},
    {label: "Prior Treatment Agent", key: "prior_treatment_agent"},
    {label: "Genomic Alteration", key: "genomic_alteration"},
    {label: "Hugo Symbol", key: "true_hugo_symbol"},
    {label: "Mutation Effect", key: "mutation_effect"},
    {label: "True Variant Classification", key: "true_variant_classification"},
    {label: "Variant Category", key: "variant_category"},
    {label: "Left Partner Gene", key: "left_partner_gene"},
    {label: "Right Partner Gene", key: "right_partner_gene"},
    {label: "CNV Call", key: "cnv_call"},
    {label: "MS Status", key: "ms_status"},
    {label: "Match Type", key: "match_type"},
    {label: "Patient Match Values", key:"patient_match_values"},
    {label: "Oncotree Primary Diagnosis Match Value", key:"oncotree_primary_diagnosis_match_value"},
    {label: "Match Criteria", key: "query"},
    {label: 'Queries Used', key: 'queries_used'}
  ];
  // csv download link ref

  // don't have global const state for csvLink as it can be null as component is mounted/unmounted when datatable is changed
  let csvLink: React.MutableRefObject<any> = useRef(null);

  const onSort = (event: any) => {
    if (event.multiSortMeta) {
      setMultiSortMeta(event.multiSortMeta); // Update multiSortMeta state
    }
  };

  const extractDateTime = (dateStr) => {
    // Extract date and time before "by" in the string
    const match = dateStr.match(/(.*?)(?=\s+by\s+|$)/);
    return match ? match[1] : dateStr;
  };

  const customDateSort = (event) => {
    const { data, order, field } = event;
    return [...data].sort((a, b) => {
      const dateA = new Date(extractDateTime(a[field])).getTime();
      const dateB = new Date(extractDateTime(b[field])).getTime();
      return order * (dateA - dateB);
    });
  };

  const downloadBodyTemplate = (rowData) => {
    // set the ref in body template so we know it's mounted
    csvLink = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>();

    return <>
      <i className={classNames('pi', { 'true-icon pi-download': rowData.trialRetCount > 0, '': rowData.trialRetCount == 0 })}
         onClick={() => {
           downloadClicked(rowData);
         }}
      ></i>
      <CSVLink
        headers={headers}
        data={downloadResults}
        filename={resultFileName}
        className='hidden'
        ref={csvLink}
        target='_blank'
      />
    </>
  };

  const downloadClicked = (e: any) => {
    setTrialSelected(e);
    dispatch(setIsLongOperation(true));
    getDownloadResultsOperation(e.id);
  }

  // if trial is pending state (send to CTML but hasn't been matched), then don't display
  // trialRetCount and matchedDate
  const postProcess = (data: any) => {
    let dataCopy = [];
    for (let cur of data) {
      const curCopy = {
        id: cur.id,
        trialId: cur.nct_id,
        nickname: cur.nickname,
        principal_investigator: cur.principal_investigator,
        // ctml_status_label: cur.ctml_status_label,
        createdAt: cur.createdAt,
        updatedAt: cur.updatedAt,
        protocol_no: cur.protocol_no,
        trialRetCount: (cur.trialStatus === TrialStatusEnum[TrialStatusEnum.PENDING]) ? '' : cur.trialRetCount,
        matchedDate: cur.matchedDate? cur.matchedDate : '',
        trialStatus: cur.trialStatus,
        short_title: cur.short_title,
        matchSentDate: cur.matchSentDate
      }
      dataCopy.push(curCopy);
    }
    return dataCopy;
  }

  // add Trial ID, Trial Name, Trial Match Date
  const postProcessCSVData = (data: any) => {
    for (let cur of data) {
      cur.trialId = trialSelected.trialId;
      cur.trialName = trialSelected.short_title;
      cur.matchDate = trialSelected.matchedDate;
      cur.query = JSON.stringify(cur.query);
    }
    return data;
  }

  return (
    <>
      {data && <>
        <span className={styles.titleText}>Match Results</span>

        <div className={styles.tableContainer}>
          <DataTable value={results} rowHover={true} paginator rows={10}
                     rowsPerPageOptions={[5, 10, 25, 50]}
                     loading={props.getTrialsForUsersInGroupLoading || getMatchResultsLoading}
                     sortField="createdOn" sortOrder={-1}
                     emptyMessage={'No match results.'}
                     sortMode="multiple"
                     multiSortMeta={multiSortMeta}
                     onSort={onSort}
                     removableSort
          >
            <Column field="trialId" header="ID" sortable></Column>
            <Column field="nickname" header="Nickname" sortable></Column>
            <Column field="principal_investigator" header="Principal Investigator" sortable></Column>
            <Column
              field="createdAt"
              header="Created on"
              sortable
              sortFunction={customDateSort}
            />
            <Column
              field="updatedAt"
              header="Modified on"
              sortable
              sortFunction={customDateSort}
            />
            <Column field="trialStatus" header="Match Status" sortable ></Column>
            <Column field="trialRetCount" header="Match Results" sortable></Column>
            <Column field="matchSentDate" header="Last Matched" dataType="date" sortable></Column>
            <Column field="matchedDate" header="Last New Result" dataType="date" sortable></Column>
            <Column field="download" header="Download" dataType="boolean" style={{minWidth: '6rem'}}
                    body={downloadBodyTemplate}></Column>
          </DataTable>
        </div>
      </>}
    </>
  )
}

export default Results;
