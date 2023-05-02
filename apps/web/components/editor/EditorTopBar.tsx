import styles from './EditorTopBar.module.scss';
import {useRouter} from "next/router";
import {Button} from 'primereact/button';
import {store} from "../../store/store";
import {ValidationData} from "@rjsf/utils";
import {useEffect, useRef, useState} from "react";
import ExportCtmlDialog from "./ExportCtmlDialog";
import {signOut} from "next-auth/react";
import {Toast} from "primereact/toast";
import useSaveTrial from "../../hooks/useSaveTrial";
import {UpdateTrialDto} from "../../../api/src/app/trial/dto/update-trial.dto";


const EditorTopBar = () => {

  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const {
    response: saveTrialResponse,
    error: saveTrialError,
    loading: saveTrialLoading,
    saveTrialOperation
  } = useSaveTrial();


  const router = useRouter();

  const toast = useRef(null);

  useEffect(() => {
    if (saveTrialResponse) {
      console.log('response', saveTrialResponse);

    }
    if(saveTrialError) {
      console.log('error', saveTrialError);
      if (saveTrialError.statusCode === 401) {
        signOut({callbackUrl: '/#/login', redirect: false});
      }
    }
  }, [saveTrialError, saveTrialResponse]);

  const backClick = (e) => {
    e.preventDefault();
    router.back();
  }

  const onExportClick = () => {
    const state = store.getState();
    const ctmlModel = state.finalModelAndErrors.ctmlModel;
    const formErrors: ValidationData<any> = state.finalModelAndErrors.errorSchema;
    const ctmlModelString = JSON.stringify(ctmlModel, null, 2);
    // setErrorViewModel(viewModelErrors)
    setIsDialogVisible(true);
    console.log('onExportClick', formErrors);
  }

  const getValidationErrors = () => {
    const state = store.getState();
    const formErrors: ValidationData<any> = state.finalModelAndErrors.errorSchema;
    return formErrors;
  }

  const onSaveClick = () => {

    const state = store.getState();
    const ctmlModel = state.finalModelAndErrors.ctmlModel;

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

    const getTrialModelOnly = (): UpdateTrialDto => {
      return {
        nct_id: ctmlModel.trialInformation.trial_id,
        nickname: ctmlModel.trialInformation.nickname,
        principal_investigator: ctmlModel.trialInformation.principal_investigator,
        status: ctmlModel.trialInformation.status,
      }
    }

    console.log('onSaveClick', ctmlModel);
    if (!ctmlModel.trialInformation.trial_id) {
      toast.current.show({
        severity:
          'info',
        summary: 'Error Saving',
        detail: 'Trial ID is required',
      });
      return;
    }

    saveTrialOperation(getTrialModelOnly(), getCtmlJsonOnly());
  }

  return (
    <>
      <Toast ref={toast} position="top-center" />
      <ExportCtmlDialog
        isDialogVisible={isDialogVisible}
        exportCtmlClicked={onExportClick}
        onDialogHide={() => setIsDialogVisible(false)}
      />
    <div className={styles.topBar}>
      <div className={styles.logoContainer}>
        <img src={'/assets/ctims-logo.svg'} alt={'logo'} className={styles.logo}/>
      </div>
      <div className={styles.nav}>
        <div className={styles.btnTitleContainer}>
          <div className={styles.backBtn} onClick={(e) => backClick(e)}>
            <i className="pi pi-arrow-left"></i>
          </div>
          <div className={styles.title}>New CTML</div>
        </div>
        <div className={styles.menuBtnGroup}>
          <Button label="Discard" className="p-button-text p-button-plain" />
          <Button label="Export"
                  onClick={onExportClick}
                  className="p-button-text p-button-plain" />
          <Button label="Save" className={styles.saveBtn} onClick={onSaveClick} />
        </div>

      </div>
    </div>
    </>
  )
}
export default EditorTopBar;
