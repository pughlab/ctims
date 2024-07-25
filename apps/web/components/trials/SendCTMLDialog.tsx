import React, {useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import styles from "./SendCTMLDialog.module.scss";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import useGetMatchResults from "../../hooks/useGetMatchResults";

interface SendCTMLDialogProps {
  trials: any[];
  isCTMLDialogVisible: boolean;
  sendCtmlClicked: (selectedTrials: []) => void;
  onCTMLDialogHide: () => void;
}

const SendCTMLDialog = (props: SendCTMLDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(props.isCTMLDialogVisible);
  const [selectedTrials, setSelectedTrials] = useState<any>(null);
  const [results, setResults] = useState<any>([]);

  // retrieve trial match results
  const {
    response: getMatchResultsResponse,
    error: getMatchResultsError,
    loading: getMatchResultsLoading,
    getMatchResultsOperation
  } = useGetMatchResults();

  useEffect(() => {
    if (props.trials && props.trials.length > 0) {
      getMatchResultsOperation(props.trials);
    } else {
      setResults([])
    }
  }, [isDialogVisible]);

  useEffect(() => {
    if (getMatchResultsResponse) {
      // get all the trials that are not in getMatchResultsResponse with matching trial_internal_id
      const trialsWithoutResults = props.trials.filter(trial => {
        return !getMatchResultsResponse.find(matchedTrial => matchedTrial.trial_internal_id === trial.trial_internal_id)
      });

      setResults(getMatchResultsResponse.concat(trialsWithoutResults));
    }
  }, [getMatchResultsResponse])

  useEffect(() => {
    setIsDialogVisible(props.isCTMLDialogVisible);
  }, [props.isCTMLDialogVisible])

  const onDialogHide = () => {
    props.onCTMLDialogHide();
  }

  const doSendCtml = () => {
    props.sendCtmlClicked(selectedTrials);
    onDialogHide();
  }


  const footer = (props: {sendCtmlClicked: () => void}) => {
    const cancelBtn = `p-button-text ${styles['cancel-btn']}`
    const sendBtn = `${styles['send-btn']}`
    return (
      <div>
        <Button label="Cancel" className={cancelBtn} onClick={onDialogHide} />
        <Button
          label="Send"
          onClick={doSendCtml}
          className={sendBtn}
        />
      </div>
    )
  }

  return (
    <Dialog header="Send CTML"
            footer={() => footer({sendCtmlClicked: doSendCtml})}
            style={{width: '800px', minHeight: '400px'}}
            visible={isDialogVisible}
            onHide={onDialogHide}>
      <div className={styles.tableContainer}>
        <DataTable value={results}
                   sortField="nct_id" sortOrder={-1}
                   selectionMode="checkbox"
                   selection={selectedTrials}
                   onSelectionChange={e => setSelectedTrials(e.value)}
                   dataKey="nct_id"
                   metaKeySelection={false}
                   responsiveLayout="scroll"
        >
          <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
          <Column field="nct_id" header="ID"></Column>
          <Column field="matchedDate" header="Match Date" dataType="date"></Column>
          <Column field="updatedAt" header="Modified on" dataType="date"></Column>
        </DataTable>
      </div>
    </Dialog>
  )

}

export default SendCTMLDialog;
