import styles from './CtimsMatchDialog.module.scss';
import React, {createContext, CSSProperties, useEffect, useRef, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import MatchingMenuAndForm from "./MatchingMenuAndForm";
import {useDispatch, useSelector} from "react-redux";
import {RootState, store} from "../../../../../apps/web/store/store";
import {resetMatchDialogErrors} from "../../../../../apps/web/store/slices/modalActionsSlice";
import {sortMatchingCriteria} from "./helpers";

interface CtimsMatchDialogProps {
  isDialogVisible: boolean;
  onDialogHide: () => void;
  onSaveCTMLHide: () => void;
  armCode?: string;
  formData?: any;
}

export interface CtimsDialogContextType {
  setSaveBtnState: (state: boolean) => void;
}

export const CtimsDialogContext = createContext<CtimsDialogContextType | null>(null);

const CtimsMatchDialog = (props: CtimsMatchDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(props.isDialogVisible);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState<boolean>(true);

  const dispatch = useDispatch();

  const matchDialogErrors = useSelector((state: RootState) => state.modalActions.matchDialogErrors);

  let {formData} = props;

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
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

  const footer = (props: {saveMatchingCriteriaClicked: () => void, discardClicked: () => void}) => {
    const {saveMatchingCriteriaClicked, discardClicked} = props;

    return (
      <div style={{marginTop: '10px'}}>
        <Button style={dismissBtnStyle} label="Discard" className="p-button-text" onClick={discardClicked} />
        <Button style={saveBtnStyle} disabled={Object.keys(matchDialogErrors).length > 0 || saveBtnDisabled} label="Save matching criteria" onClick={saveMatchingCriteriaClicked} />
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
    dispatch(resetMatchDialogErrors());
    props.onDialogHide();
  }

  const saveClickCallback = () => {
    const currentState = store.getState();
    const ctmlModel = currentState.modalActions.ctmlDialogModel;
    // sort the ctmlModel.match before saving
    // formData.match = ctmlModel.match;
    const sorted = sortMatchingCriteria(ctmlModel.match);
    formData.match = sorted;
    props.onSaveCTMLHide();
  }

  const setSaveBtnState = (state: boolean) => {
    // console.log('setSaveBtnState', state);
    setSaveBtnDisabled(state);
  }

  return (
    <Dialog header={() => header({armCode: props.armCode as string})}
            blockScroll
            footer={() => footer({saveMatchingCriteriaClicked: saveClickCallback, discardClicked: onDialogHide})}
            visible={isDialogVisible}
            style={{width: '1160px', height: '710px'}}
            onHide={onDialogHide}>
      <div className={styles.mainContainer}>
        <CtimsDialogContext.Provider value={{setSaveBtnState}}>
          <MatchingMenuAndForm />
        </CtimsDialogContext.Provider>
      </div>
    </Dialog>
  )
}
export default CtimsMatchDialog;
