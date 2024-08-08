import './ui.module.scss';
import {CSSProperties, useEffect, useRef, useState} from "react";
import CtimsFormComponentMemo from './components/CtimsFormComponent';
import CtimsMatchDialog from './components/CtimsMatchDialog';
import {useDispatch} from "react-redux";
import {resetFormChangeCounter, resetMatchDialogErrors} from "../../../../apps/web/store/slices/modalActionsSlice";
import {
  resetActiveArmId,
  setActiveArmId,
  setCtmlMatchModel
} from "../../../../apps/web/store/slices/matchViewModelSlice";
import {setCtmlModel, setErrorSchema} from "../../../../apps/web/store/slices/ctmlModelSlice";
import {structuredClone} from "next/dist/compiled/@edge-runtime/primitives/structured-clone";
import Form from "@rjsf/core";
import {ValidationData} from "@rjsf/utils";
import { setIsFormChanged, setTrialId } from "../../../../apps/web/store/slices/contextSlice";
import {RootState, store} from "../../../../apps/web/store/store";
import {signOut} from "next-auth/react";
import process from "process";
import useSaveTrial from "../../../../apps/web/hooks/useSaveTrial";
import {useRouter} from "next/router";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import {logout} from "../../../../apps/web/pages/api/auth/[...nextauth]";
import {addVariantCategoryContainerObject} from "./components/helpers";



const containerStyle: CSSProperties = {
  width: '100%',
  marginLeft: '336px',
  marginTop: '60px',
}


/* eslint-disable-next-line */
export interface UiProps {
  ctml_schema: {schema: any, version: any};
  formData?: any;
  setLastSaved?: any;
}

export const Ui = (props: UiProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] = useState(false);
  const [armCode, setArmCode] = useState('');
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const toast = useRef(null);

  const {
    response: saveTrialResponse,
    error: saveTrialError,
    loading: saveTrialLoading,
    saveTrialOperation
  } = useSaveTrial();

  const formRef = useRef<any>();

  const dispatch = useDispatch();

  useEffect(() => {
    const currentURL = window.location.href;
    if (currentURL.includes('/trials/create')) {
      dispatch(setTrialId(0))
    }
    if(currentURL.includes('/trials/edit/')) {
      const form: Form = formRef.current;
      form.validateForm();
      const errorDetails: ValidationData<any> = form.validate(props.formData);
      dispatch(setErrorSchema(errorDetails));
    }
  }, []);

  useEffect(() => {
    if (saveTrialResponse) {
      console.log('response', saveTrialResponse);
      // @ts-ignore
      toast.current.show({
        severity:
          'info',
        summary: 'Trial saved',
      });

      props.setLastSaved(saveTrialResponse.updatedAt);
      dispatch(setIsFormChanged(false));
    }
    if(saveTrialError) {
      console.log('error', saveTrialError);
      // @ts-ignore
      if (saveTrialError.statusCode === 401) {
        signOut({redirect: false}).then(() => {
          store.dispatch(logout());
          router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
        });
      }
    }
  }, [saveTrialError, saveTrialResponse]);

  const handleSpecialClick = (formD: any, id: string) => {
    const formData = formD
    console.log('handleSpecialClick formData: ', formD.formData);
    console.log('handleSpecialClick armCode: ', formData.arm_code);
    console.log('handleSpecialClick id: ', id);
    if (Array.isArray(formData.match)) {
      const formDataWithVariantCategoryContainerObject = addVariantCategoryContainerObject(formData.match);
      formData.match = formDataWithVariantCategoryContainerObject;
    }
    setArmCode(formData.arm_code)
    setFormData(formData)
    dispatch(setCtmlMatchModel(structuredClone(formData)))
    dispatch(setActiveArmId(id))
    setIsOpen(true);
  }

  const onFormChange = (data: any, id: any) => {
    if (formRef && formRef.current) {
      const form: Form = formRef.current;
      form.validateForm();
      const errorDetails: ValidationData<any> = form.validate(data.formData);
      dispatch(setErrorSchema(errorDetails));
      // Check if the form change event is from the hidden uuid field
      // if so, then we dont need to mark the formChanged flag for CTM-491
      if (id.includes('uuid')) {
        // do nothing here
      } else {
        dispatch(setIsFormChanged(true));
      }
    }

    let formDataClone = structuredClone(data.formData)
    const transformPriorDataFromObjectToArray = formDataClone.prior_treatment_requirements?.prior_treatment_requirement && formDataClone.prior_treatment_requirements?.prior_treatment_requirement.map((item: { prior_treatment_requirement_name: any; }) => item.prior_treatment_requirement_name);
    formDataClone = {...formDataClone, prior_treatment_requirements : transformPriorDataFromObjectToArray}
    dispatch(setCtmlModel(formDataClone))
  }

  const accept = () => {
    // console.log('accept', rowClicked);
    setIsOpen(false);
    dispatch(resetMatchDialogErrors());
    dispatch(resetFormChangeCounter());
  }

  const reject = () => {
    // console.log('reject', rowClicked);
  }

  const onDialogHideCallback = () => {
    const currentState = store.getState();
    const formChangeCounter = currentState.modalActions.formChangeCounter;
    if (formChangeCounter > 0) {
      setIsConfirmationDialogVisible(true);
    } else {
      setIsOpen(false);
      dispatch(resetMatchDialogErrors());
      dispatch(resetFormChangeCounter());
    }
  }

  const onSaveCTMLHideCallback = () => {
    setIsOpen(false);
    dispatch(resetFormChangeCounter())
    dispatch(resetActiveArmId())
    let formDataClone = structuredClone(formRef.current.state.formData)
    console.log('formRef state', formRef.current.state)
    if (formDataClone.prior_treatment_requirements) {
      if (formDataClone.prior_treatment_requirements.prior_treatment_requirement) {
        const transformPriorDataFromObjectToArray = formDataClone.prior_treatment_requirements.prior_treatment_requirement.map((item: { prior_treatment_requirement_name: any; }) => item.prior_treatment_requirement_name);
        formDataClone = { ...formDataClone, prior_treatment_requirements: transformPriorDataFromObjectToArray }
      }
    }
    dispatch(setCtmlModel(formDataClone))

    const currentState = store.getState();
    saveToServer(currentState)
  }

  const saveToServer = (state: RootState) => {
    const ctmlModel = state.finalModelAndErrors.ctmlModel;
    if (!ctmlModel.trialInformation.trial_id) {
      // @ts-ignore
      toast.current.show({
        severity:
          'error',
        summary: 'Error Saving',
        detail: 'Trial ID is required',
      });
      return;
    }

    const getCtmlJsonOnly = () => {
      let ctmlModelCopy;
      const age_group = ctmlModel.age_group;
      const trialInformation = ctmlModel.trialInformation;
      ctmlModelCopy = {...ctmlModel, ...trialInformation, ...age_group};
      delete ctmlModelCopy.age_group;
      delete ctmlModelCopy.trialInformation;
      delete ctmlModelCopy.ctml_status;
      delete ctmlModelCopy.nickname;
      return ctmlModelCopy;
    }

    const getTrialModelOnly = () => {
      return {
        nct_id: ctmlModel.trialInformation.trial_id,
        trial_internal_id: ctmlModel.trialInformation.trial_internal_id,
        nickname: ctmlModel.trialInformation.nickname,
        principal_investigator: ctmlModel.trialInformation.principal_investigator,
        status: ctmlModel.trialInformation.ctml_status,
        protocol_no: ctmlModel.trialInformation.protocol_no,
      }
    }

    saveTrialOperation(getTrialModelOnly(), getCtmlJsonOnly());

  }

  // @ts-ignore
  return (
    <div style={containerStyle}>
      <Toast ref={toast} />
      <CtimsFormComponentMemo
        ref={formRef}
        schema={props.ctml_schema.schema}
        onSpecialButtonClick={handleSpecialClick}
        onRjsfFormChange={onFormChange}
        formData={props.formData}
      />
      <CtimsMatchDialog
                      onDialogHide={onDialogHideCallback}
                      onSaveCTMLHide={onSaveCTMLHideCallback}
                      isDialogVisible={isOpen}
                      armCode={armCode}
                      formData={formData}
      />
      <ConfirmDialog visible={isConfirmationDialogVisible} onHide={() => setIsConfirmationDialogVisible(false)} message="Are you sure you want to discard match criteria? You will not be able to recover this after it has been deleted."
          header="Confirmation" acceptLabel="Discard" rejectLabel="Cancel" accept={accept} reject={reject}
      />
    </div>
  );
};

export default Ui;
