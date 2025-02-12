import styles from './EditorTopBar.module.scss';
import {useRouter} from "next/router";
import {Button} from 'primereact/button';
import { RootState, store } from "../../store/store";
import {ValidationData} from "@rjsf/utils";
import {useEffect, useRef, useState} from "react";
import ExportCtmlDialog from "./ExportCtmlDialog";
import {Toast} from "primereact/toast";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import useSaveTrial from "../../hooks/useSaveTrial";
import { useDispatch, useSelector } from 'react-redux';
import SendCtmlToMatchminerDialog from "./SendCTMLtoMatchminerDialog";
import useSendCTML from "../../hooks/useSendCTML";
import {setIsFormChanged, setIsFormDisabled, setIsTrialGroupAdmin} from '../../store/slices/contextSlice';
import {IS_FORM_DISABLED, SELECTED_TRIAL_GROUP_IS_ADMIN} from "../../constants/appConstants";
import useSendMatchminerJob from "../../hooks/useSendMatchminerJob";
import useHandleSignOut from "../../hooks/useHandleSignOut";
import useUpdateTrialLock from "../../hooks/useUpdateTrialLock";

interface EditorTopBarProps {
    title?: string;
    lastSaved: string;
    setLastSaved: any;
}

const EditorTopBar = (props: EditorTopBarProps) => {

  const TRIAL_LOCK_PING_TIME_MS = +process.env.NEXT_PUBLIC_TRIAL_LOCK_PING_TIME_MS || 240000;
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] = useState(false);
  const [isSendDialogVisible, setIsSendDialogVisible] = useState<boolean>(false);
  const [isOKClicked, setIsOKClicked] = useState<boolean>(false);
  const {handleSignOut} = useHandleSignOut();
  const {
    response: saveTrialResponse,
    error: saveTrialError,
    loading: saveTrialLoading,
    saveTrialOperation
  } = useSaveTrial();

  const {
    response: sendCTMLResponse,
    error: sendCTMLError,
    loading: sendCTMLLoading,
    sendCTMLOperation
  } = useSendCTML();

  const {
    response: sendMatchJobResponse,
    error: sendMatchJobError,
    loading: sendMatchJobLoading,
    sendMatchJobOperation
  } = useSendMatchminerJob();

  const {
    updateTrialLockOperation
  } = useUpdateTrialLock();

  const isGroupAdmin = useSelector((state: RootState) => state.context.isTrialGroupAdmin);
  const isFormDisabled = useSelector((state: RootState) => state.context.isFormDisabled);
  const selectedTrialInternalId = useSelector((state: RootState) => state.finalModelAndErrors.ctmlModel?.trialInformation.trial_internal_id);
  const selectedTrialId = useSelector((state: RootState) => state.context.trialId);

  const dispatch = useDispatch();

  const router = useRouter();

  const toast = useRef(null);

  useEffect(() => {
    const state = store.getState();
    let group_id = state.context.seletedTrialGroupId;
    if (!group_id) {
      // trial group info is lost if page is refreshed, re-establish if user is admin
      const isGroupAdminFromStorage = sessionStorage.getItem(SELECTED_TRIAL_GROUP_IS_ADMIN) === 'TRUE';
      dispatch(setIsTrialGroupAdmin(isGroupAdminFromStorage));
      const isFormDisabledFromStorage = sessionStorage.getItem(IS_FORM_DISABLED) === 'TRUE';
      dispatch(setIsFormDisabled(isFormDisabledFromStorage));
    }
  }, []);

  // on refresh, selectedTrialId from state reloads after this component is mounted, so moved this here
  useEffect(() => {
    // ping the server to update the lock periodically
    if (selectedTrialId) {
      const trialId = selectedTrialId;
      if (!isFormDisabled) {
        const interval = setInterval(() => {
          updateTrialLockOperation(trialId);
        }, TRIAL_LOCK_PING_TIME_MS);

        // clear when unmount
        return () => {
          clearInterval(interval);
        }
      }
    }
  }, [selectedTrialId]);

  useEffect(() => {
    if (saveTrialResponse) {
      console.log('response', saveTrialResponse);
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
      if (saveTrialError.statusCode === 401) {
        handleSignOut();
      } else {
        toast.current.show({
          severity:
            'error',
          summary: 'Error Saving',
          detail: saveTrialError.message,
        });

      }
    }
  }, [saveTrialError, saveTrialResponse]);

  useEffect(() => {
    if (sendCTMLResponse) {
      console.log('response', sendCTMLResponse);
      if (sendCTMLResponse.status === 201) {
        toast.current.show({
          severity:
            'info',
          summary: 'CTML sent to Matcher successfully',
        });
        sendMatchJobOperation([selectedTrialInternalId])
      }
    }
    if(sendCTMLError) {
      console.log('error', sendCTMLError);
      if (sendCTMLError.statusCode === 401) {
        handleSignOut();
      }
    }
  }, [sendCTMLError, sendCTMLResponse]);

  useEffect(() => {
    if (sendMatchJobResponse) {
      console.log('response', sendMatchJobResponse);
      if (sendMatchJobResponse.status === 201) {
        toast.current.show({
          severity:
            'info',
          summary: 'CTML queued to Matcherminer for matching',
        });
      }
    }
    if(sendMatchJobError) {
      console.log('error', sendMatchJobError);
      if (sendMatchJobError.statusCode === 401) {
        handleSignOut();
      }
    }
  }, [sendMatchJobError, sendMatchJobResponse]);

  useEffect(() => {
    if (isOKClicked) {
      useSendCTML();
    }
  }, [isOKClicked]);

  const backClick = (e) => {
    e.preventDefault();
    const currentState = store.getState();
    const isFormChanged = currentState.context.isFormChanged;
    if (isFormChanged) {
      setIsConfirmationDialogVisible(true);
    } else {
      router.push('/main');
    }
  }

  const accept = () => {
    // console.log('accept', rowClicked);
    dispatch(setIsFormChanged(false));
    router.push('/main');
  }

  const reject = () => {
    // console.log('reject', rowClicked);
  }

  const onExportClick = () => {
    setIsDialogVisible(true);
  }

  const onSendClick = () => {
    if (process.env.NEXT_PUBLIC_ENABLE_MATCHMINER_INTEGRATION === 'true') {
      setIsSendDialogVisible(true);
    }
    else {
      // let user know matchminer is not available
      toast.current.show({
        severity:
          'info',
        summary: 'CTIMS matching functionality is not enabled. Please contact your administrator.',
      });
    }
  }

  const handleSendCTMLOKClicked = (val: boolean) => {
    if (val) {
      sendCTMLOperation();
    }
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

    console.log('onSaveClick', ctmlModel);
    if (!ctmlModel.trialInformation.trial_id) {
      toast.current.show({
        severity:
          'error',
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
      <ConfirmDialog visible={isConfirmationDialogVisible} onHide={() => setIsConfirmationDialogVisible(false)} message="Are you sure you want to leave this page? Unsaved inputs will be lost."
                     header="Confirmation" acceptLabel="Discard" rejectLabel="Cancel" accept={accept} reject={reject}
      />
      <ExportCtmlDialog
        isDialogVisible={isDialogVisible}
        exportCtmlClicked={onExportClick}
        onDialogHide={() => setIsDialogVisible(false)}
      />
      <SendCtmlToMatchminerDialog
        isCTMLDialogVisible={isSendDialogVisible}
        sendCtmlClicked={onSendClick}
        onCTMLDialogHide={() => setIsSendDialogVisible(false)}
        onIsOKClicked={handleSendCTMLOKClicked}/>
      <div className={styles.topBar}>
        <div className={styles.logoContainer}>
          <img src={'/assets/ctims-logo.svg'} alt={'logo'} className={styles.logo}/>
        </div>
        <div className={styles.nav}>
          <div className={styles.btnTitleContainer}>
            <div className={styles.backBtn} onClick={(e) => backClick(e)}>
              <i className="pi pi-arrow-left"></i>
            </div>
            <div className={styles.title}>{props.title ? props.title : "New CTML"}</div>
          </div>
          <div className={styles.lastsaved}>Last saved: {props.lastSaved}</div>
          <div className={styles.menuBtnGroup}>
            {/*<Button label="Discard" className="p-button-text p-button-plain" />*/}
            {isGroupAdmin &&
              <Button
                label="Export"
                onClick={onExportClick}
                className="p-button-text p-button-plain"
              />
            }
            <>
              {isGroupAdmin &&
                <Button disabled={isFormDisabled} label="Send CTML to Matcher" className={styles.saveBtn} onClick={onSendClick} />
              }
            </>
            <Button disabled={isFormDisabled} label="Save" className={styles.saveBtn} onClick={onSaveClick} />
          </div>

        </div>
      </div>
    </>
  )
}
export default EditorTopBar;
