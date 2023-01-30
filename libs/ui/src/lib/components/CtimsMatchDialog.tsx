import styles from './CtimsMatchDialog.module.scss';
import React, {CSSProperties, useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import MatchingMenuAndForm from "./MatchingMenuAndForm";

interface CtimsMatchDialogProps {
  isDialogVisible: boolean;
  onDialogHide: () => void;
}

const CtimsMatchDialog = (props: CtimsMatchDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState(props.isDialogVisible);

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
  }, [props.isDialogVisible])

  const MatchingCriteriaPreview = () => {
    return (
      <div className={styles.matchingCriteriaPreview}>
        Matching criteria preview will be shown here.
      </div>
    )
  }

  const handleSubmit = () => {
    console.log('clicked submit');
  }

  const dismissBtnStyle: CSSProperties = {
    height: '36px',
    fontFamily: "'Inter', sans-serif",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#2E72D2'
  }

  const saveBtnStyle: CSSProperties = {
    marginLeft: '8px',
    backgroundColor: '#2E72D2',
    fontFamily: "'Inter', sans-serif",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '16px',
    height: '36px'
  }

  const footer = (
    <div style={{marginTop: '10px'}}>
      <Button style={dismissBtnStyle} label="Discard" className="p-button-text" onClick={handleSubmit} />
      <Button style={saveBtnStyle} label="Save matching criteria" onClick={handleSubmit} />
    </div>
  );

  const onDialogHide = () => {
    props.onDialogHide();
  }

  return (
    <Dialog header="<arm_code> matching criteria" footer={footer} visible={isDialogVisible} style={{width: '960px', height: '800px'}} onHide={onDialogHide}>
      <div className={styles.mainContainer}>
        <MatchingMenuAndForm/>
        <MatchingCriteriaPreview/>
      </div>
    </Dialog>
  )
}
export default CtimsMatchDialog;
