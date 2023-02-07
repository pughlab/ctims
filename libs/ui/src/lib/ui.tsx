import './ui.module.scss';
// import {schema, uiSchema} from "./custom-rjsf-templates/generatedSchema";
import {CSSProperties, useEffect, useState} from "react";
import CtimsFormComponentMemo from './components/CtimsFormComponent';
import CtimsMatchDialog from './components/CtimsMatchDialog';
import {useDispatch} from "react-redux";
import {resetFormChangeCounter} from "../../../../apps/web/pages/store/slices/modalActionsSlice";
import {resetActiveArmId, setActiveArmId} from "../../../../apps/web/pages/store/slices/matchViewModelSlice";


const containerStyle: CSSProperties = {
  width: '100%',
}


/* eslint-disable-next-line */
export interface UiProps {}

export const Ui = (props: UiProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const [armCode, setArmCode] = useState('');
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('My component was re-rendered');
  });

  const handleSpecialClick = (formD: any, armCode: string, id: string) => {
    console.log('handleSpecialClick formData: ', formD);
    console.log('handleSpecialClick armCode: ', armCode);
    console.log('handleSpecialClick id: ', id);
    setArmCode(armCode)
    setFormData(formD)
    dispatch(setActiveArmId(id))
    setIsOpen(true);
  }

  const handleSubmit = (e: any) => {
    console.log(e);
  }

  const onFormChange = (data: any) => {
    console.log('onChange event', data)
  }

  const onDialogHideCallback = () => {
    setIsOpen(false);
    dispatch(resetFormChangeCounter())
    dispatch(resetActiveArmId())
  }

  // @ts-ignore
  return (
    <div style={containerStyle}>
      <CtimsFormComponentMemo
        onSpecialButtonClick={handleSpecialClick}
        onRjsfFormChange={onFormChange}
      />
      <CtimsMatchDialog
                      onDialogHide={onDialogHideCallback}
                      isDialogVisible={isOpen}
                      armCode={armCode}
                      formData={formData}
      />
    </div>
  );
};

export default Ui;
