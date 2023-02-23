import styles from './CtimsMatchDialog.module.scss';
import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import MatchingMenuAndForm from "./MatchingMenuAndForm";
import {OverlayPanel} from "primereact/overlaypanel";
import {useSelector} from "react-redux";
import dynamic from 'next/dynamic';
import {store} from "../../../../../apps/web/store/store";
const BrowserReactJsonView = dynamic(() => import('react-json-view'), {
  ssr: false,
});

interface CtimsMatchDialogProps {
  isDialogVisible: boolean;
  onDialogHide: () => void;
  armCode?: string;
  formData?: any;
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
  let {formData} = props;

  const op = useRef<OverlayPanel>(null);

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
    console.log('CtimsMatchDialog useEffect', formData);
  }, [props.isDialogVisible])


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

  const footer = (props: {saveMatchingCriteriaClicked: () => void}) => {
    const {saveMatchingCriteriaClicked} = props;

    const handleSubmit = (e: any) => {
      console.log('clicked submit', formData);
      // formData.match = {sup: 'sup'}
      op.current?.toggle(e)
    }
    return (
      <div style={{marginTop: '10px'}}>
        <Button style={dismissBtnStyle} label="Discard" className="p-button-text" onClick={handleSubmit} />
        <Button style={saveBtnStyle} label="Save matching criteria" onClick={saveMatchingCriteriaClicked} />
        {/*<OverlayPanel*/}
        {/*  ref={op}*/}
        {/*  showCloseIcon*/}
        {/*  id="overlay_panel"*/}
        {/*  style={{ width: "750px" }}*/}
        {/*>*/}
        {/*  <CtmlModelPreview />*/}
        {/*</OverlayPanel>*/}
      </div>
    )
  }

  const header = ({armCode}: {armCode: string}) => {
    return (
      <div>
        <span>{armCode} matching criteria</span>
      </div>
    )
  }

  const onDialogHide = () => {
    props.onDialogHide();
  }

  const saveClickCallback = () => {
    const currentState = store.getState();
    const ctmlModel = currentState.modalActions.ctmlDialogModel;
    console.log('callback from footer', currentState.modalActions.ctmlDialogModel);
    formData.match = ctmlModel.match;
    onDialogHide();
  }

  return (
    <Dialog header={() => header({armCode: props.armCode as string})}
            footer={() => footer({saveMatchingCriteriaClicked: saveClickCallback})}
            visible={isDialogVisible}
            style={{width: '960px', height: '710px'}}
            onHide={onDialogHide}>
      <div className={styles.mainContainer}>
        <MatchingMenuAndForm />
      </div>
    </Dialog>
  )
}
export default CtimsMatchDialog;
