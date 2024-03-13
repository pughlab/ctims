import React, {useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import styles from "./NewNctidDialog.module.scss";
import {Button} from "primereact/button";
import { InputText } from 'primereact/inputtext';

interface NewNctidDialogProps {
  isNctidDialogVisible: boolean;
  createCTMLClicked: () => void;
  onNctidDialogHide: () => void;
  onIsOKClicked: (val) => void;
}

const NewNctidDialog = (props: NewNctidDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(props.isNctidDialogVisible);
  const [createButtonDisabled, setCreateButtonDisabled] = useState<boolean>(true);
  const [nctidValue, setNctidValue] = useState<string>('');

  useEffect(() => {
    setIsDialogVisible(props.isNctidDialogVisible);
    setNctidValue('')
  }, [props.isNctidDialogVisible])

  useEffect(() => {
    if (nctidValue) {
      setCreateButtonDisabled(false);
    } else {
      setCreateButtonDisabled(true);
    }
  }, [nctidValue])

  const onDialogHide = () => {
    props.onNctidDialogHide();
  }

  const doCreateCtml = () => {
    props.onIsOKClicked(nctidValue);
    onDialogHide();
  }

  const errorContent = () => {
    return (
      <>
        <div>You must enter a valid NCT ID number.</div>
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
          label="Create CTML"
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
            <label htmlFor="nctid">NCT ID: </label>
            <InputText id="nctid" aria-describedby="nctid-help" style={inputStyle} value={nctidValue} onChange={(e) => setNctidValue(e.target.value)}/>
        </div>
      </div>
    </Dialog>
  )

}

export default NewNctidDialog;
