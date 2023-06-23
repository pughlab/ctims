import TopBar from "../../components/trials/TopBar";
import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {router} from "next/client";
import styles from "../trials/index.module.scss";
import {DataTable, DataTableRowMouseEventParams} from "primereact/datatable";
import {Column} from "primereact/column";
import useGetTrialsForUsersInGroup from "../../hooks/useGetTrialsForUsersInGroup";
import useGetMatchResults from "../../hooks/useGetMatchResults";
import MatchResult from "../../model/MatchResult";
import CondensedMatchResult from "../../model/CondensedMatchResult";
import {classNames} from "primereact/utils";

const Results = () => {

  // maybe don't need this one we refactor tab navigation
  const {data} = useSession()
  useEffect(() => {
    if (!data) {
      router.push('/');
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

  useEffect(() => {
    if (getMatchResultsResponse) {
      postProcessResults(getMatchResultsResponse);
    }
  }, [getMatchResultsResponse])

  // match results use effects
  const [results, setResults] = useState<any>([]);
  const [rowEntered, setRowEntered] = useState<DataTableRowMouseEventParams>(null);
  const [rowClicked, setRowClicked] = useState<any>(null);

  const postProcessResults = (results: MatchResult[]) => {
    const ret = [];

    // for each trial in results, merge the ones with same protocol_no
    const availableProtocolNoMap: Map<string, {resultCount: number, resultDate: string}> = new Map();
    for (let i = 0; i < results.length; i++) {
      const result:MatchResult = results[i];
      let count = 1;
      let updateDate: string = result.matchDate;
      console.log(availableProtocolNoMap.has(result.trialId))
      console.log('result', result)
      if (availableProtocolNoMap.has(result.trialId)) {
        count = availableProtocolNoMap.get(result.trialId).resultCount;
        count ++;
      }
      availableProtocolNoMap.set(results[i].trialId, {resultCount: count, resultDate: updateDate});
    }

    for (let [key, value] of availableProtocolNoMap) {
      ret.push({
        protocol_no: key,
        results: value.resultCount,
        resultsDate: value.resultDate,
      });
    }
    setResults(ret);
  }

  const downloadBodyTemplate = (rowData: CondensedMatchResult) => {
    return <i className={classNames('pi', { 'true-icon pi-download': rowData.matchCCount > 0, '': rowData.matchCCount = 0 })}></i>;
  };

  return (
    <>
      <TopBar/>
      {data && <>
        <div className={styles.pageContainer}>
          <span className={styles.trialsText}>Match Results</span>
        </div>

        <div className={styles.tableContainer}>
          <DataTable value={results} rowHover={true}
                     loading={getMatchResultsLoading}
                     onRowMouseEnter={(event) => setRowEntered(event.data)}
                     onRowMouseLeave={() => setRowEntered(null)}
                     sortField="createdOn" sortOrder={-1}
                     emptyMessage={'No match results.'}
          >
            <Column field="protocol_no" header="ID"></Column>
            <Column field="nickname" header="Nickname"></Column>
            <Column field="principal_investigator" header="Principal Investigator"></Column>
            <Column field="ctml_status_label" header="CTML Status" sortable></Column>
            <Column field="createdAt" header="Created on" dataType="date"></Column>
            <Column field="updatedAt" header="Modified on" dataType="date"></Column>
            <Column field="results" header="Match Results"></Column>
            <Column field="resultsDate" header="Match Date" dataType="date"></Column>
            <Column field="download" header="Download" dataType="boolean" style={{ minWidth: '6rem' }} body={downloadBodyTemplate}></Column>
          </DataTable>
        </div>
      </>}
    </>
  )
}
export default Results;
