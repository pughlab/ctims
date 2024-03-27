import {useEffect, useState} from "react";
import {InputText} from "primereact/inputtext";
import useRunMatch from "../../hooks/useRunMatch";
import styles from './MatchMinerConsole.module.scss';
import { Button } from 'primereact/button';

const MatchMinerConsole = () => {

  const [trialInternalIds, setTrialInternalIds] = useState('');
  const [runMessage, setRunMessage] = useState('');

  // initiate match to run
  const {
    response: getMatchRunResponse,
    error: getMatchRunError,
    loading: getMatchRunIsLoading,
    runMatchOperation
  } = useRunMatch();

  const runMatchClicked = () => {
    console.log('run match clicked', trialInternalIds);
    setRunMessage('')
    runMatchOperation(trialInternalIds);
  }

  const onTrialInternalIdEntered = (trial_internal_id_str: string) => {
    setTrialInternalIds(trial_internal_id_str);
    setRunMessage('');
  }

  useEffect(() => {
    if (getMatchRunResponse) {
      setRunMessage(`${getMatchRunResponse.status}: ${getMatchRunResponse.statusText}`);
    }
  }, [getMatchRunResponse]);

  useEffect(() => {
    if (getMatchRunError) {
      setRunMessage(`${getMatchRunError.statusCode}: ${getMatchRunError.message}`);
    }
  }, [getMatchRunError]);

  return (
    <div className={styles.mmContainer}>
      <label>Enter trial <b>internal Id(s)</b>, comma seperated.</label>
        <InputText value={trialInternalIds} onChange={(e) => onTrialInternalIdEntered(e.target.value)}>
        </InputText>
        <Button className={styles.mmSubmitBtn} onClick={runMatchClicked} disabled={trialInternalIds.length === 0}
                style={{background: '#2E72D2'}} label="Run Match"/>
        <div>Status: {runMessage}</div>
    </div>
  );
}

export default MatchMinerConsole;
