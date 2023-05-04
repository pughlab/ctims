import './ui.module.scss';
import {CSSProperties, useEffect, useRef, useState} from "react";
import CtimsFormComponentMemo from './components/CtimsFormComponent';
import CtimsMatchDialog from './components/CtimsMatchDialog';
import {useDispatch} from "react-redux";
import {resetFormChangeCounter} from "../../../../apps/web/store/slices/modalActionsSlice";
import {
  resetActiveArmId,
  setActiveArmId,
  setCtmlMatchModel
} from "../../../../apps/web/store/slices/matchViewModelSlice";
import {setCtmlModel, setErrorSchema} from "../../../../apps/web/store/slices/ctmlModelSlice";
import {structuredClone} from "next/dist/compiled/@edge-runtime/primitives/structured-clone";
import Form from "@rjsf/core";
import {ValidationData} from "@rjsf/utils";
import {setTrialId} from "../../../../apps/web/store/slices/contextSlice";


const containerStyle: CSSProperties = {
  width: '100%',
  marginLeft: '336px',
  marginTop: '60px',
}


/* eslint-disable-next-line */
export interface UiProps {
  ctml_schema: {schema: any, version: any};
}

export const Ui = (props: UiProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const [armCode, setArmCode] = useState('');
  const [formData, setFormData] = useState({});

  const formRef = useRef<any>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTrialId(0))
  }, []);

  const handleSpecialClick = (formD: any, id: string) => {
    const formData = formD
    console.log('handleSpecialClick formData: ', formD.formData);
    console.log('handleSpecialClick armCode: ', formData.arm_code);
    console.log('handleSpecialClick id: ', id);
    setArmCode(formData.arm_code)
    setFormData(formData)
    dispatch(setCtmlMatchModel(structuredClone(formData)))
    dispatch(setActiveArmId(id))
    setIsOpen(true);
  }

  const handleSubmit = (e: any) => {
    console.log(e);
  }

  const onFormChange = (data: any) => {
    if (formRef && formRef.current) {
      const form: Form = formRef.current;
      form.validateForm();
      const errorDetails: ValidationData<any> = form.validate(data.formData);
      dispatch(setErrorSchema(errorDetails));
    }

    const formDataClone = structuredClone(data.formData)
    dispatch(setCtmlModel(formDataClone))
  }

  const onDialogHideCallback = () => {
    setIsOpen(false);
    dispatch(resetFormChangeCounter())
    dispatch(resetActiveArmId())
    const formDataClone = structuredClone(formRef.current.state.formData)
    console.log('formRef state', formRef.current.state)
    dispatch(setCtmlModel(formDataClone))
  }

  // @ts-ignore
  return (
    <div style={containerStyle}>
      <CtimsFormComponentMemo
        ref={formRef}
        schema={props.ctml_schema.schema}
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
