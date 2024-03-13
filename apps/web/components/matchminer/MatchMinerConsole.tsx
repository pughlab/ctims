import {useEffect, useState} from "react";
import {InputText} from "primereact/inputtext";
import useRunMatch from "../../hooks/useRunMatch";
import styles from './MatchMinerConsole.module.scss';
import { Button } from 'primereact/button';

const MatchMinerConsole = () => {

  const [protocol_nos, setProtocolNos] = useState('');
  const [runMessage, setRunMessage] = useState('');

  // initiate match to run
  const {
    response: getMatchRunResponse,
    error: getMatchRunError,
    loading: getMatchRunIsLoading,
    runMatchOperation
  } = useRunMatch();

  const runMatchClicked = () => {
    console.log('run match clicked', protocol_nos);
    runMatchOperation(protocol_nos);
  }

  const onProtocolEntered = (protocol_str: string) => {
    setProtocolNos(protocol_str);
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
      <label>Enter trial <b>protocol number(s)</b>: comma seperated, leave blank to run all trials.</label>
        <InputText value={protocol_nos} onChange={(e) => onProtocolEntered(e.target.value)}>
        </InputText>
        <Button className={styles.mmSubmitBtn} onClick={runMatchClicked} style={{background: '#2E72D2'}} label="Run Match"/>
        <div>Status: {runMessage}</div>
    </div>
  );
}

export default MatchMinerConsole;
