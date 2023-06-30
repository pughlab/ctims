import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Dialog} from "primereact/dialog";
import styles from "./SendCTMLtoMatchminerDialog.module.scss";
import {Button} from "primereact/button";

interface SendCtmlDialogProps {
  isCTMLDialogVisible: boolean;
  sendCtmlClicked: () => void;
  onCTMLDialogHide: () => void;
  onIsOKClicked: (val) => void;
}

const SendCtmlToMatchminerDialog = (props: SendCtmlDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(props.isCTMLDialogVisible);
  const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(true);

  const ctmlModel = useSelector((state: RootState) => state.finalModelAndErrors.ctmlModel);

  useEffect(() => {
    setIsDialogVisible(props.isCTMLDialogVisible);
  }, [props.isCTMLDialogVisible])

  useEffect(() => {
    if(ctmlModel === null) {
      console.log('ctmlModel not ready');
      setSendButtonDisabled(true);
    } else {
      console.log('ctmlModel', ctmlModel);
      setSendButtonDisabled(false);

    }
  }, [ctmlModel])

  const onDialogHide = () => {
    props.onCTMLDialogHide();
  }

  const doSendCtml = () => {
    props.onIsOKClicked(true);
    onDialogHide();
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
      <div className={styles['dialog-content']}>
        Are you sure you want to send CTML to Matcher? Please ensure all mandatory fields are complete to optimize match results.'
      </div>
    </Dialog>
  )

}

export default SendCtmlToMatchminerDialog;
