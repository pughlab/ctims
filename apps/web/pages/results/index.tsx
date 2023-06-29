import TopBar from "../../components/trials/TopBar";
import React, {useEffect, useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {router} from "next/client";
import styles from "../trials/index.module.scss";
import {DataTable, DataTableRowMouseEventParams} from "primereact/datatable";
import {Column} from "primereact/column";
import useGetMatchResults from "../../hooks/useGetMatchResults";
import {classNames} from "primereact/utils";
import useDownloadResults from "../../hooks/useDownloadResults";
import { CSVLink } from "react-csv";
import {CtmlStatusEnum} from "../../../../libs/types/src/ctml-status.enum";
import IdleComponent from "../../components/IdleComponent";

const Results = () => {

  const {data, status: sessionStatus} = useSession()
  useEffect(() => {
    if (!data) {
      return;
    }
    localStorage.setItem('ctims-accessToken', data['accessToken']);
    console.log('data', data)

    getMatchResultsOperation();
  }, [data])

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
      setDownloadResults(getDownloadResultsResponse);
    }
  }, [getDownloadResultsResponse])

  const [downloadResults, setDownloadResults] = useState<any>([]);
  useEffect(() => {
    if (downloadResults.length > 0) {
      // @ts-ignore
      csvLink.current.link.click();
    }
  }, [downloadResults])

  // match results use effects
  const [results, setResults] = useState<any>([]);
  // const [rowEntered, setRowEntered] = useState<DataTableRowMouseEventParams>(null);
  // const [rowClicked, setRowClicked] = useState<any>(null);

  const headers = [
    {label: "Arm Description", key: "arm_description"},
    {label: "Study ID", key: "studyId"},
    {label: "Patient ID", key: "mrn"},
    {label: "Sample ID", key: "sample_id"},
    {label: "Vital Status", key: "vita_status"},
    {label: "Gender", key: "gender"},
    {label: "Age", key: "age"},
    {label: "Diagnosis", key: "oncotree_primary_diagnosis_name"},
    {label: "HER2 Status", key: "her2_status"},
    {label: "ER Status", key: "er_status"},
    {label: "PR Status", key: "pr_status"},
    {label: "Genomic Alteration", key: "genomic_alteration"},
    {label: "Hugo Symbol", key: "true_hugo_symbol"},
    {label: "Mutation Effect", key: "mutation_effect"}
  ];
  // csv download link ref
  const csvLink = useRef()

  const downloadBodyTemplate = (rowData) => {
    return <>
        <i className={classNames('pi', { 'true-icon pi-download': rowData.trialRetCount > 0, '': rowData.trialRetCount == 0 })}
              onClick={() => {
                downloadClicked(rowData);
              }}
        ></i>
        <CSVLink
          headers={headers}
          data={downloadResults}
          filename={rowData.nct_id + '_result.csv'}
          className='hidden'
          ref={csvLink}
          target='_blank'
      />
      </>
  };

  const downloadClicked = (e: any) => {
    getDownloadResultsOperation(e.trialId, e.nct_id);
  }

  // if trial is pending state (send to CTML but hasn't been matched), then don't display
  // trialRetCount and matchedDate
  const postProcess = (data: any) => {
    let dataCopy = [];
    for (let cur of data) {
      const curCopy = {
        trialId: cur.trialId,
        nickname: cur.nickname,
        principal_investigator: cur.principal_investigator,
        ctml_status_label: cur.ctml_status_label,
        createdAt: cur.createdAt,
        updatedAt: cur.updatedAt,
        trialRetCount: (cur.ctml_status_label === CtmlStatusEnum.PENDING) ? '' : cur.trialRetCount,
        matchedDate: (cur.ctml_status_label === CtmlStatusEnum.PENDING) ? null : cur.matchedDate,
      }
    }
    return data;
  }

  return (
    <>
      <IdleComponent />
      {sessionStatus === 'loading' && <div>Loading...</div>}
      {sessionStatus === 'authenticated' && <>
      <TopBar/>
        {data && <>
          <div className={styles.pageContainer}>
            <span className={styles.trialsText}>Match Results</span>
          </div>

          <div className={styles.tableContainer}>
            <DataTable value={results} rowHover={true}
                       loading={getMatchResultsLoading}
              // onRowMouseEnter={(event) => setRowEntered(event.data)}
              // onRowMouseLeave={() => setRowEntered(null)}
                       sortField="createdOn" sortOrder={-1}
                       emptyMessage={'No match results.'}
            >
              <Column field="trialId" header="ID"></Column>
              <Column field="nickname" header="Nickname"></Column>
              <Column field="principal_investigator" header="Principal Investigator"></Column>
              <Column field="ctml_status_label" header="CTML Status" sortable></Column>
              <Column field="createdAt" header="Created on" dataType="date"></Column>
              <Column field="updatedAt" header="Modified on" dataType="date"></Column>
              <Column field="trialRetCount" header="Match Results"></Column>
              <Column field="matchedDate" header="Match Date" dataType="date"></Column>
              <Column field="download" header="Download" dataType="boolean" style={{minWidth: '6rem'}}
                      body={downloadBodyTemplate}></Column>
            </DataTable>
          </div>
        </>}
      </>}
      {sessionStatus === 'unauthenticated' && <div>Please log in to view this page.</div>}
    </>
  )
}
export default Results;
