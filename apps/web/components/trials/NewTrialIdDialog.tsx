import React, {useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import styles from "./NewTrialIdDialog.module.scss";
import {Button} from "primereact/button";
import { InputText } from 'primereact/inputtext';

interface NewTrialIdDialogProps {
  isTrialIdDialogVisible: boolean;
  createCTMLClicked: () => void;
  onTrialIdDialogHide: () => void;
  onIsOKClicked: (val) => void;
}

const NewTrialIdDialog = (props: NewTrialIdDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(props.isTrialIdDialogVisible);
  const [createButtonDisabled, setCreateButtonDisabled] = useState<boolean>(true);
  const [trialIdValue, setTrialIdValue] = useState<string>('');

  useEffect(() => {
    setIsDialogVisible(props.isTrialIdDialogVisible);
    setTrialIdValue('')
  }, [props.isTrialIdDialogVisible])

  useEffect(() => {
    if (trialIdValue.trim()) {
      setCreateButtonDisabled(false);
    } else {
      setCreateButtonDisabled(true);
    }
  }, [trialIdValue])

  const onDialogHide = () => {
    props.onTrialIdDialogHide();
  }

  const doCreateCtml = () => {
    props.onIsOKClicked(trialIdValue);
    onDialogHide();
  }

  const errorContent = () => {
    return (
      <>
        <div>You must enter a valid Trial ID number.</div>
      </>
    )
  }

  const footer = (props: {createCtmlClicked: () => void}) => {
    const {createCtmlClicked} = props;
    const cancelBtn = `p-button-text ${styles['cancel-btn']}`
    const createBtn = `${styles['create-btn']}`
    return (
      <div>
        <Button label="Cancel" className={cancelBtn} onClick={onDialogHide} />
        <Button
          label="OK"
          disabled={createButtonDisabled}
          onClick={createCtmlClicked}
          className={createBtn}
        />
      </div>
    )
  }

  const inputStyle = {
    width: '82%'
  }

  return (
    <Dialog header="Create CTML"
            footer={() => footer({createCtmlClicked: doCreateCtml})}
            visible={isDialogVisible}
            style={{width: '400px', minHeight: '200px'}}
            onHide={onDialogHide}>
      <div className={styles['dialog-content']}>
        <div className="mb-2">
            <label htmlFor="trialId">Trial ID: </label>
            <InputText id="trialId" aria-describedby="trialId-help" style={inputStyle} value={trialIdValue} onChange={(e) => setTrialIdValue(e.target.value)}/>
        </div>
      </div>
    </Dialog>
  )

}

export default NewTrialIdDialog;
