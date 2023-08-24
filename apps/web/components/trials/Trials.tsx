import useDeleteTrial from '../../hooks/useDeleteTrial';
import useGetTrialsForUsersInGroup from '../../hooks/useGetTrialsForUsersInGroup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { DataTable, DataTableRowMouseEventParams } from 'primereact/datatable';
import { useRouter } from 'next/router';
import { setIsFormDisabled } from '../../store/slices/contextSlice';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import styles from './Trials.module.scss';
import { Button } from 'primereact/button';
import TrialGroupsDropdown from './TrialGroupsDropdown';
import { Menu } from 'primereact/menu';
import { Column } from 'primereact/column';

const Trials = () => {
  const { response: deleteTrialResponse, error: deleteTrialError, loading: deleteTrialLoading, deleteTrialOperation } = useDeleteTrial();
  const { response: getTrialsForUsersInGroupResponse, error: getTrialsForUsersInGroupError, loading: getTrialsForUsersInGroupLoading, getTrialsForUsersInGroupOperation } = useGetTrialsForUsersInGroup();
  const isTrialGroupAdmin = useSelector((state: RootState) => state.context.isTrialGroupAdmin);
  const {data, status: sessionStatus} = useSession()
  const [trials, setTrials] = useState<any>([]);
  const [rowEntered, setRowEntered] = useState<DataTableRowMouseEventParams>(null);
  const [rowClicked, setRowClicked] = useState<any>(null);
  const [selectedTrialGroup, setSelectedTrialGroup] = useState<{ plainRole: string, isAdmin: boolean }>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const menu = useRef(null);

  const createCtmlClick = (e) => {
    e.preventDefault();
    dispatch(setIsFormDisabled(false));
    router.push(`/trials/create/${selectedTrialGroup.plainRole}`);
  }

  const trialMenuItems = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => {
        console.log('Edit');
        dispatch(setIsFormDisabled((rowClicked?.user.email !== data.user.email) && !isTrialGroupAdmin));
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
            console.log('accept', rowClicked);
            deleteTrialOperation(rowClicked.id);
          },
          reject: () => {
            console.log('reject');
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

  const onTrialGroupSelected = ({ role, code }) => {
    const plainRole = code.replace('-admin', '');
    setSelectedTrialGroup({ plainRole, isAdmin: code.includes('admin') });
    getTrialsForUsersInGroupOperation(plainRole);
  }

  useEffect(() => {
    if (!data) {
      return;
    }
    localStorage.setItem('ctims-accessToken', data['accessToken']);
    console.log('data', data)
  }, [data])

  useEffect(() => {
    if (getTrialsForUsersInGroupError) {
      console.error('Error fetching trials:', getTrialsForUsersInGroupError);
    }
  }, [getTrialsForUsersInGroupError]);

  useEffect(() => {
    if (deleteTrialError) {
      console.error('Error deleting trial:', deleteTrialError);
    }
  }, [deleteTrialError]);

  useEffect(() => {
    if (getTrialsForUsersInGroupResponse) {
      setTrials(getTrialsForUsersInGroupResponse);
      console.log('response', getTrialsForUsersInGroupResponse);
    }
  }, [getTrialsForUsersInGroupResponse]);

  useEffect(() => {
    if (deleteTrialResponse) {
      getTrialsForUsersInGroupOperation(selectedTrialGroup.plainRole);
    }
  }, [deleteTrialResponse]);

  const onImportClicked = () => {
    console.log('onImportClicked');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none'; // Ensure it's not displayed

    // Attach an event listener to handle file selection
    fileInput.addEventListener('change', (event) => {
      // @ts-ignore
      const file = event.target.files[0];
      if (file) {
        console.log('File selected:', file);
        const reader = new FileReader();

        // If the file is text (e.g., .txt, .csv, .json), use readAsText
        reader.readAsText(file);

        reader.onload = function() {
          // console.log("File contents:", reader.result);
          sessionStorage.setItem('imported_ctml', reader.result as string);
          router.push(`/trials/import`);
        };

        reader.onerror = function() {
          console.error("Error reading file:", reader.error);
          sessionStorage.removeItem('imported_ctml')
        };
      }

      // Remove the input element from the document after use
      document.body.removeChild(fileInput);
    });

    // Append the input element to the document
    document.body.appendChild(fileInput);

    // Programmatically trigger a click on the input element
    fileInput.click();
  }

  return (
    <>
      <ConfirmDialog />
      <div >
        <TrialGroupsDropdown roles={(data as unknown as any).roles} onTrialGroupSelected={onTrialGroupSelected} />
        <div className={styles.titleAndButtonsContainer}>
          <span className={styles.trialsText}>Trials</span>
          <div className={styles.buttonsContainer}>
            <Button disabled={!selectedTrialGroup} label="Import" className="p-button-text p-button-plain" onClick={onImportClicked} />
            <Button disabled={!selectedTrialGroup} label="Create CTML" className={styles.createCtmlButton} onClick={createCtmlClick} />
          </div>
        </div>

        <Menu model={trialMenuItems} ref={menu} popup id="popup_menu" className={styles.menu} appendTo={'self'}
              onHide={clearRowClicked} />

        <div className={styles.tableContainer}>
          <DataTable value={trials} rowHover={true}
                     loading={getTrialsForUsersInGroupLoading || deleteTrialLoading}
                     onRowMouseEnter={(event) => setRowEntered(event.data)}
                     onRowMouseLeave={() => setRowEntered(null)}
                     sortField="createdOn" sortOrder={-1}
                     emptyMessage={!selectedTrialGroup ? 'Select a Trial Group to start' : 'No CTML files. Select the \'Create\' button to start.'}
          >
            <Column field="nct_id" header="ID"></Column>
            <Column field="id" header="" body={subMenuTemplate}></Column>
            <Column field="nickname" header="Nickname"></Column>
            <Column field="principal_investigator" header="Principal Investigator"></Column>
            <Column field="ctml_status_label" header="CTML Status" sortable></Column>
            <Column field="createdAt" header="Created on" dataType="date"></Column>
            <Column field="updatedAt" header="Modified on" dataType="date"></Column>
          </DataTable>
        </div>

      </div>
    </>
  )
}
export default Trials
