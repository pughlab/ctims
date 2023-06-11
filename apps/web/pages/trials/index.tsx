import styles from './index.module.scss';
import { Button } from 'primereact/button';
import { DataTable, DataTableRowMouseEventParams } from 'primereact/datatable';
import { Column } from 'primereact/column';

import TopBar from "../../components/trials/TopBar";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import React from 'react';
import { Menu } from "primereact/menu";
import { useSession } from "next-auth/react";
import useGetUserTrials from "../../hooks/useGetUserTrials";

import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import useDeleteTrial from '../../hooks/useDeleteTrial';
import TrialGroupsDropdown from '../../components/trials/TrialGroupsDropdown';
import useGetTrialsForUsersInGroup from '../../hooks/useGetTrialsForUsersInGroup';
import {setIsFormDisabled} from "./../../store/slices/contextSlice";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../store/store";


const Trials = () => {

  // const {response, error, loading, getAllTrialsOperation} = useGetUserTrials();
  const {
    response: deleteTrialResponse,
    error: deleteTrialError,
    loading: deleteTrialLoading,
    deleteTrialOperation
  } = useDeleteTrial();
  const {
    response: getTrialsForUsersInGroupResponse,
    error: getTrialsForUsersInGroupError,
    loading: getTrialsForUsersInGroupLoading,
    getTrialsForUsersInGroupOperation
  } = useGetTrialsForUsersInGroup();

  const isTrialGroupAdmin = useSelector((state: RootState) => state.context.isTrialGroupAdmin);


  const {data} = useSession()
  // console.log('session', data);
  // const { accessToken } = data

  useEffect(() => {
    if (!data) {
      router.push('/');
      return;
    }
    localStorage.setItem('ctims-accessToken', data['accessToken']);
    console.log('data', data)
  }, [data])

  useEffect(() => {
    if (getTrialsForUsersInGroupResponse) {
      setTrials(getTrialsForUsersInGroupResponse);
      console.log('response', getTrialsForUsersInGroupResponse);
    }
  }, [getTrialsForUsersInGroupResponse]);

  useEffect(() => {
    if (deleteTrialResponse) {
      // console.log('deleteTrialResponse', deleteTrialResponse);
      getTrialsForUsersInGroupOperation(selectedTrialGroup.plainRole);
    }
  }, [deleteTrialResponse]);


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
    // is row where mouse event entered the same as the current row to display?
    let isShown = (rowEntered === rowData);
    // if the menu is shown, check the current row is the row where menu was clicked
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

  const onTrialGroupSelected = (e: { role: string, code: string }) => {
    console.log('onTrialGroupSelected', e);
    const plainRole = e.code.replace('-admin', '');
    setSelectedTrialGroup({plainRole, isAdmin: e.code.includes('admin')});
    getTrialsForUsersInGroupOperation(plainRole);
  }

  return (
    <>
      <ConfirmDialog/>
      {data && <>
        <TopBar/>
        <div className={styles.pageContainer}>
          <TrialGroupsDropdown roles={(data as any).roles} onTrialGroupSelected={onTrialGroupSelected}/>
          <div className={styles.titleAndButtonsContainer}>
            <span className={styles.trialsText}>Trials</span>
            <div className={styles.buttonsContainer}>
              <Button label="Import" className="p-button-text p-button-plain"/>
              <Button disabled={!selectedTrialGroup} label="Create CTML" className={styles.createCtmlButton} onClick={(e) => createCtmlClick(e)}/>
            </div>
          </div>

          <Menu model={trialMenuItems} ref={menu} popup id="popup_menu" className={styles.menu} appendTo={'self'}
                onHide={() => clearRowClicked()}/>

          <div className={styles.tableContainer}>
            <DataTable value={trials} rowHover={true}
                       loading={getTrialsForUsersInGroupLoading || deleteTrialLoading}
                       onRowMouseEnter={(event) => setRowEntered(event.data)}
                       onRowMouseLeave={() => setRowEntered(null)}
                       sortField="createdOn" sortOrder={-1}
                       emptyMessage={!selectedTrialGroup ? 'Please select a trial group' : 'No CTML files. Select the \'Create\' button to start.'}
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
      </>}

    </>


  )
}
export default Trials
