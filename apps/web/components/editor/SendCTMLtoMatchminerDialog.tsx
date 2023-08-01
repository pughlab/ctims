import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Dialog} from "primereact/dialog";
import styles from "./SendCTMLtoMatchminerDialog.module.scss";
import {Button} from "primereact/button";
import { Message } from 'primereact/message';

interface SendCtmlDialogProps {
  isCTMLDialogVisible: boolean;
  sendCtmlClicked: () => void;
  onCTMLDialogHide: () => void;
  onIsOKClicked: (val) => void;
}

const SendCtmlToMatchminerDialog = (props: SendCtmlDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(props.isCTMLDialogVisible);
  const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(true);

  const isFormChanged = useSelector((state: RootState) => state.context.isFormChanged);

  useEffect(() => {
    setIsDialogVisible(props.isCTMLDialogVisible);
  }, [props.isCTMLDialogVisible])

  useEffect(() => {
    if (isFormChanged) {
      setSendButtonDisabled(true);
    } else {
      setSendButtonDisabled(false);
    }
  }, [isFormChanged])

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
        <div>You must save the CTML before sending to the Matcher.</div>
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
      {isFormChanged && <Message severity="error"
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
