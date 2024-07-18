import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Dialog} from "primereact/dialog";
import styles from "./SendCTMLtoMatchminerDialog.module.scss";
import {Button} from "primereact/button";
import { Message } from 'primereact/message';
import {
  isTrialHaveOneMatch,
  isTrialStatusEligible
} from "../../../../libs/ui/src/lib/components/helpers";

interface SendCtmlDialogProps {
  isCTMLDialogVisible: boolean;
  sendCtmlClicked: () => void;
  onCTMLDialogHide: () => void;
  onIsOKClicked: (val) => void;
}

const SendCtmlToMatchminerDialog = (props: SendCtmlDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(props.isCTMLDialogVisible);
  const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(true);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const isFormChanged = useSelector((state: RootState) => state.context.isFormChanged);
  const trialModel = useSelector((state: RootState) => state.finalModelAndErrors.ctmlModel);

  useEffect(() => {
    setIsDialogVisible(props.isCTMLDialogVisible);

    let newErrorMessages = [];
    if (isFormChanged) {
      newErrorMessages.push(["You must save the CTML before sending to the Matcher."]);
    }

    if (trialModel) {
      const trialStatusObj = () => {
        return {
          status: trialModel.trialInformation?.ctml_status,
        }
      }
      if (!isTrialStatusEligible(trialStatusObj())) {
        newErrorMessages.push(["CTML Status must be In Review or Complete to send CTML to matcher. Update the CTML Status (in Trial Information section) and try again."]);
      }

      if (!isTrialHaveOneMatch(trialModel)) {
        newErrorMessages.push(["You must input at least one type of match criteria before sending CTML to Matcher."]);
      }
    }

    setErrorMessages([...newErrorMessages]);
  }, [props.isCTMLDialogVisible])

  useEffect(() => {
    if (errorMessages.length > 0) {
      setSendButtonDisabled(true);
    } else {
      setSendButtonDisabled(false);
    }
  }, [errorMessages])

  const onDialogHide = () => {
    props.onCTMLDialogHide();
  }

  const doSendCtml = () => {
    props.onIsOKClicked(true);
    onDialogHide();
  }

  const errorContent = () => {
    return (
      <>
        {errorMessages.map((msg, index) => {
          return <div style={{marginBottom: '1rem'}}>{msg}</div>
        })}
      </>
    )
  }

  const footer = (props: {sendCtmlClicked: () => void}) => {
    const {sendCtmlClicked} = props;
    const cancelBtn = `p-button-text ${styles['cancel-btn']}`
    const sendBtn = `${styles['send-btn']}`
    return (
      <div>
        <Button label="Cancel" className={cancelBtn} onClick={onDialogHide} />
        <Button
          label="OK"
          disabled={sendButtonDisabled}
          onClick={sendCtmlClicked}
          className={sendBtn}
        />
      </div>
    )
  }

  return (
    <Dialog header="Send CTML"
            footer={() => footer({sendCtmlClicked: doSendCtml})}
            visible={isDialogVisible}
            style={{width: '700px', minHeight: '200px'}}
            onHide={onDialogHide}>
      <div>
      {(errorMessages.length > 0) && <Message severity="error"
               style={{
                 marginLeft: '18px',
                 marginBottom: '10px'
               }}
               content={errorContent()} />}
      </div>
      <div className={styles['dialog-content']}>
        Are you sure you want to send CTML to Matcher? Please ensure all mandatory fields are complete to optimize match results.
      </div>
    </Dialog>
  )

}

export default SendCtmlToMatchminerDialog;
