import useDeleteTrial from '../../hooks/useDeleteTrial';
import { useDispatch, useSelector } from 'react-redux';
import {RootState, store} from '../../store/store';
import {signOut, useSession} from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { DataTable, DataTableRowMouseEventParams } from 'primereact/datatable';
import { useRouter } from 'next/router';
import { setIsFormChanged, setIsFormDisabled, setTrialNctId} from '../../store/slices/contextSlice';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import styles from './Trials.module.scss';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Column } from 'primereact/column';
import {Toast} from "primereact/toast";
import {parse} from "yaml";
import NewTrialIdDialog from './NewTrialIdDialog';
import {IS_FORM_DISABLED} from "../../constants/appConstants";
import useSendMatchminerJob from "../../hooks/useSendMatchminerJob";
import SendCTMLDialog from "./SendCTMLDialog";
import useSendMultipleCTMLs from "../../hooks/useSendMultipleCTMLs";
import {CtmlStatusEnum} from "../../../../libs/types/src/ctml-status.enum";
import useGetTrialsByIDs from "../../hooks/useGetTrialsByIDs";
import { Tooltip } from 'primereact/tooltip';
import useHandleSignOut from "../../hooks/useHandleSignOut";
import useClearTrialLocks from "../../hooks/useClearTrialLocks";

// property selectedTrialGroup from parent component when dropdown changed
// trials is the list of trials for the selected trial group
// onTrialDeleted is a callback to parent component when a trial is deleted
// getTrialsForUsersInGroupLoading indicate if the trials are being fetched
const Trials = (props: {selectedTrialGroup: { plainRole: string, isAdmin: boolean }, trials: [], onTrialDeleted: () => void, getTrialsForUsersInGroupLoading: boolean}) => {
  const { response: deleteTrialResponse, error: deleteTrialError, loading: deleteTrialLoading, deleteTrialOperation } = useDeleteTrial();
  const isTrialGroupAdmin = useSelector((state: RootState) => state.context.isTrialGroupAdmin);
  const {data, status: sessionStatus} = useSession()
  const [rowEntered, setRowEntered] = useState<DataTableRowMouseEventParams>(null);
  const [rowClicked, setRowClicked] = useState<any>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const menu = useRef(null);

  const [isTrialIdDialogVisible, setIsTrialIdDialogVisible] = useState<boolean>(false);
  const [isSendDialogVisible, setIsSendDialogVisible] = useState<boolean>(false);
  const [selectedTrialsToMatch, setSelectedTrialsToMatch] = useState([]);

  const trialsErrorToast = useRef(null);

  const eligibleTrials: any[] = props.trials.filter((trial: any) => {
    if (trial.ctml_jsons && Array.isArray(trial.ctml_jsons) && trial.ctml_jsons.length > 0) {
      return trial.status != CtmlStatusEnum.DRAFT && trial.ctml_jsons[0].has_match;
    } else {
      return false;
    }

  });

  const {handleSignOut} = useHandleSignOut();
  const {
    response: sendMultipleCTMLsResponse,
    error: sendMultipleCTMLsError,
    loading: sendMultipleCTMLsLoading,
    sendMultipleCTMLsOperation
  } = useSendMultipleCTMLs();

  const {
    response: sendMatchJobResponse,
    error: sendMatchJobError,
    loading: sendMatchJobLoading,
    sendMatchJobOperation
  } = useSendMatchminerJob();

  const {
    response: getTrialsByIDsResponse,
    error: getTrialsByIDsError,
    loading: getTrialsByIDsLoading,
    getTrialsByIDsOperation
  } = useGetTrialsByIDs();

  useEffect(() => {
    if (getTrialsByIDsResponse) {
      const ctmlJsonsData: any[] = getTrialsByIDsResponse.data;
      const selectedJsons = ctmlJsonsData.map((ctmlJsonData) => ctmlJsonData.ctml_jsons[0].data);
      sendMultipleCTMLsOperation(selectedJsons)
    }
  }, [getTrialsByIDsResponse]);

  useEffect(() => {
    if (sendMultipleCTMLsResponse) {
      // send CTML successful, initiate the run matches
      if (sendMultipleCTMLsResponse.status === 201) {
        trialsErrorToast.current.show({
          severity:
            'info',
          summary: 'CTML sent to Matcher successfully',
        });
        sendMatchJobOperation(selectedTrialsToMatch)
      }
    }
  }, [sendMultipleCTMLsResponse]);

  const createCtmlClick = (e) => {
    setIsTrialIdDialogVisible(true);
  }

  const trialMenuItems = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => {
        let isFormDisabled = (rowClicked?.user.email !== data.user.email) && !isTrialGroupAdmin;
        // also check if the trial is locked
        if (rowClicked.lockStatus === 'Locked' && rowClicked.lockedUser !== data.user.name) {
          trialsErrorToast.current.show({
            severity: "error",
            summary: 'CTML is locked by another user',
          });
          isFormDisabled = true;
        }
        dispatch(setIsFormDisabled(isFormDisabled));
        sessionStorage.setItem(IS_FORM_DISABLED, isFormDisabled.toString().toUpperCase());
        router.push(`/trials/edit/${rowClicked.id}`);
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      disabled: (rowClicked?.user.email !== data?.user.email) && !isTrialGroupAdmin,
      command: () => {
        confirmDialog({
          header: 'Are you sure you want to delete?',
          message: 'You will not be able to recover this after it has been deleted.',
          rejectLabel: 'Cancel',
          acceptLabel: 'Delete',
          accept: () => {
            // console.log('accept', rowClicked);
            deleteTrialOperation(rowClicked.id);
          },
          reject: () => {
            // console.log('reject');
          }
        });
      }
    },
  ]

  const menuButtonStyle = {
    color: 'black',
    height: '20px',
    paddingTop: '0px',
    paddingBottom: '0px',
    boxShadow: 'none',
  }

  const subMenuTemplate = (rowData) => {
    let isShown = (rowEntered === rowData);
    if (rowClicked) {
      isShown = rowData.id === rowClicked.id;
    }
    return (
      <div className={styles.trailsEllipseBtn}>
        {isShown ?
          <Button icon="pi pi-ellipsis-h" iconPos="right" className="p-button-text p-button-plain"
                  style={menuButtonStyle}
                  onClick={(event) => myClick(event, rowData)}></Button>
          : <div></div>}
      </div>
    );
  }

  const myClick = (event, rowData) => {
    menu.current.toggle(event);
    setRowClicked(rowData);
  }

  const clearRowClicked = () => {
    setRowClicked(null);
    setRowEntered(null);
  }

  const onSendClick = (trials) => {
    console.log('send clicked', trials);
    if (trials) {
      const selectedTrials = trials.map((trial) => trial.trial_internal_id);
      setSelectedTrialsToMatch(selectedTrials);
      getTrialsByIDsOperation(selectedTrials);
    }
  }

  useEffect(() => {
    if (!data) {
      return;
    }
    sessionStorage.removeItem('imported_ctml');
    // console.log('data', data)
  }, [data])

  useEffect(() => {
    if (deleteTrialError) {
        trialsErrorToast.current.show({
            severity: "error",
            summary: 'Error deleting trial',
        });
    }
  }, [deleteTrialError]);

  useEffect(() => {
    if (deleteTrialResponse) {
      props.onTrialDeleted();
    }
  }, [deleteTrialResponse]);

  useEffect(() => {
    if (sendMultipleCTMLsResponse) {
      console.log('response', sendMultipleCTMLsResponse);
      if (sendMultipleCTMLsResponse.status === 201) {
        trialsErrorToast.current.show({
          severity:
            'info',
          summary: 'CTML sent to Matcher successfully',
        });
        // sendMatchJobOperation([selectedTrialInternalId])
      }
    }
    if(sendMultipleCTMLsError) {
      console.log('error', sendMultipleCTMLsError);
      if (sendMultipleCTMLsError.statusCode === 401) {
        handleSignOut()
      }
    }
  }, [sendMultipleCTMLsError, sendMultipleCTMLsResponse]);

  useEffect(() => {
    if (sendMatchJobResponse) {
      console.log('response', sendMatchJobResponse);
      if (sendMatchJobResponse.status === 201) {
        trialsErrorToast.current.show({
          severity:
            'info',
          summary: 'CTML(s) queued to Matcherminer for matching',
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

  const onCreateCTMLClick = () => {
    setIsTrialIdDialogVisible(true);
  }

  const handleCreateCTMLClicked = (val: string) => {
    if (val) {
      dispatch(setIsFormDisabled(false));
      sessionStorage.setItem(IS_FORM_DISABLED, 'FALSE');
      dispatch(setTrialNctId(val));
      dispatch(setIsFormChanged(true));
      router.push(`/trials/create/${props.selectedTrialGroup.plainRole}`);
    }
  }

  const onImportClicked = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none'; // Ensure it's not displayed

    // Attach an event listener to handle file selection
    fileInput.addEventListener('change', (event) => {
      // @ts-ignore
      const file = event.target.files[0];
      console.log('file type', file.type);
      if (file && (file.type === 'application/json' || file.type === 'application/x-yaml')) {
        const reader = new FileReader();

        // If the file is text (e.g., .txt, .csv, .json), use readAsText
        reader.readAsText(file);

        reader.onload = function() {
          let ctmlModel = reader.result as string;
          if (file.type === 'application/x-yaml') {
            ctmlModel = parse(reader.result as string);
            ctmlModel = JSON.stringify(ctmlModel, null, 2);
          }
          sessionStorage.setItem('imported_ctml', ctmlModel);
          dispatch(setIsFormChanged(true));
          router.push(`/trials/import`);
        };

        reader.onerror = function() {
          trialsErrorToast.current.show({
            severity: "error",
            summary: reader.error
          });
          sessionStorage.removeItem('imported_ctml')
        };
      } else {
        trialsErrorToast.current.show({
          severity: "error",
          summary: 'Please select a valid JSON or YAML file'
        });
      }

      // Remove the input element from the document after use
      document.body.removeChild(fileInput);
    });

    // Append the input element to the document
    document.body.appendChild(fileInput);

    // Programmatically trigger a click on the input element
    fileInput.click();
  }

  const sendCtmlClick = (e) => {
    if (process.env.NEXT_PUBLIC_ENABLE_MATCHMINER_INTEGRATION === 'true') {
      setIsSendDialogVisible(true);
    }
    else {
      // let user know matchminer is not available
      trialsErrorToast.current.show({
        severity:
          'info',
        summary: 'CTIMS matching functionality is not enabled. Please contact your administrator.',
      });
    }

  }

  const lockStatusTemplate = (rowData) => {
    const isLocked = rowData.lockStatus;
    const lockedUser = rowData.lockedUser;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip target={`.lock-icon-${rowData.id}`} content={isLocked == "Locked" ? `${lockedUser} is currently editing the CTML.` : `CTML can be edited.`} />
        <div className={`lock-icon lock-icon-${rowData.id}`}>
          {isLocked == "Locked" ?
            <i className="pi pi-lock" style={{ color: "black", marginRight: '8px' }} /> :
            <i className="pi pi-unlock" style={{ color: 'grey', marginRight: '8px' }} />
          }
        </div>
      </div>
    );
  };

  return (
    <>
      <Toast ref={trialsErrorToast}></Toast>
      <ConfirmDialog />
      <NewTrialIdDialog
        isTrialIdDialogVisible={isTrialIdDialogVisible}
        createCTMLClicked={onCreateCTMLClick}
        onTrialIdDialogHide={() => setIsTrialIdDialogVisible(false)}
        onIsOKClicked={handleCreateCTMLClicked}/>
      <SendCTMLDialog
        trials={eligibleTrials}
        isCTMLDialogVisible={isSendDialogVisible}
        sendCtmlClicked={(selectedTrials) => onSendClick(selectedTrials)}
        onCTMLDialogHide={() => setIsSendDialogVisible(false)}/>
      <div >
        <div className={styles.titleAndButtonsContainer}>
          <span className={styles.trialsText}>Trials</span>
          <div className={styles.buttonsContainer}>
            <Button disabled={!props.selectedTrialGroup} label="Import CTML" className="p-button-text p-button-plain" onClick={onImportClicked} />
            <Button disabled={!props.selectedTrialGroup} label="Create CTML" className={styles.createCtmlButton} onClick={createCtmlClick} />
            <Button disabled={(!props.selectedTrialGroup || !isTrialGroupAdmin)} label="Send CTML(s) to Matcher" className={styles.createCtmlButton} onClick={sendCtmlClick} />
          </div>
        </div>

        <Menu model={trialMenuItems} ref={menu} popup id="popup_menu" className={styles.menu} appendTo={'self'}
              onHide={clearRowClicked} />

        <div className={styles.tableContainer}>
          <DataTable value={props.trials} rowHover={true}
                     loading={props.getTrialsForUsersInGroupLoading || deleteTrialLoading}
                     onRowMouseEnter={(event) => setRowEntered(event.data)}
                     onRowMouseLeave={() => setRowEntered(null)}
                     sortField="createdOn" sortOrder={-1}
                     emptyMessage={!props.selectedTrialGroup ? 'Select a Trial Group to start' : 'No CTML files. Select the \'Create\' button to start.'}
          >
            <Column field="nct_id" header="ID" sortable></Column>
            <Column field="id" header="" body={subMenuTemplate}></Column>
            <Column field="nickname" header="Nickname" sortable></Column>
            <Column field="principal_investigator" header="Principal Investigator" sortable></Column>
            <Column field="ctml_status_label" header="CTML Status" sortable></Column>
            <Column field="createdAt" header="Created on" dataType="date" sortable></Column>
            <Column field="updatedAt" header="Modified on" dataType="date" sortable></Column>
            <Column field="lockStatus" header="Lock Status" body={lockStatusTemplate} sortable></Column>
          </DataTable>
        </div>

      </div>
    </>
  )
}
export default Trials
