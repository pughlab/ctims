import styles from './CtimsMatchDialog.module.scss';
import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import MatchingMenuAndForm from "./MatchingMenuAndForm";
import {OverlayPanel} from "primereact/overlaypanel";
import {useSelector} from "react-redux";
import dynamic from 'next/dynamic';
const BrowserReactJsonView = dynamic(() => import('react-json-view'), {
  ssr: false,
});

interface CtimsMatchDialogProps {
  isDialogVisible: boolean;
  onDialogHide: () => void;
  armCode?: string;
}

const CtmlModelPreview = () => {
  const ctmlModel = useSelector((state: any) => state.modalActions.ctmlDialogModel);
  return (
    <div>
      {/*<BrowserReactJsonView src={ctmlModel} displayObjectSize={false} displayDataTypes={false} />*/}
      <pre>{JSON.stringify(ctmlModel, null, 2)}</pre>
    </div>
  )
}

const CtimsMatchDialog = (props: CtimsMatchDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState(props.isDialogVisible);

  const op = useRef<OverlayPanel>(null);

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

  const footer = () => {
    const handleSubmit = (e: any) => {
      console.log('clicked submit');
      op.current?.toggle(e)
    }
    return (
      <div style={{marginTop: '10px'}}>
        <Button style={dismissBtnStyle} label="Discard" className="p-button-text" onClick={handleSubmit} />
        <Button style={saveBtnStyle} label="Save matching criteria" onClick={handleSubmit} />
        <OverlayPanel
          ref={op}
          showCloseIcon
          id="overlay_panel"
          style={{ width: "750px" }}
        >
          <CtmlModelPreview />
        </OverlayPanel>
      </div>
    )
  }

  const header = (props: {armCode: string}) => {
    console.log('header props', props);
    return (
      <div>
        <span>{props.armCode} matching criteria</span>
      </div>
    )
  }

  const onDialogHide = () => {
    props.onDialogHide();
  }

  return (
    <Dialog header={() => header({armCode: props.armCode as string})} footer={footer} visible={isDialogVisible} style={{width: '960px', height: '800px'}} onHide={onDialogHide}>
      <div className={styles.mainContainer}>
        <MatchingMenuAndForm />
        <MatchingCriteriaPreview/>
      </div>
    </Dialog>
  )
}
export default CtimsMatchDialog;
