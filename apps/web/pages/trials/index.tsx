import styles from './index.module.scss';
import { Button } from 'primereact/button';
import {DataTable, DataTableRowMouseEventParams} from 'primereact/datatable';
import { Column } from 'primereact/column';

import TopBar from "../../components/trials/TopBar";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import React from 'react';
import {Menu} from "primereact/menu";
import {useSession} from "next-auth/react";
import useGetUserTrials from "../../hooks/useGetUserTrials";

const Trials = () => {

  const {response, error, loading, getAllTrialsOperation} = useGetUserTrials();

  const {data} = useSession()
  console.log('session', data);
  // const { accessToken } = data

  useEffect(() => {
    if(!data) {
      router.push('/');
      return;
    }
    localStorage.setItem('ctims-accessToken', data['accessToken']);
  }, [data])

  useEffect(() => {
    getAllTrialsOperation();
  }, []);

  useEffect(() => {
    if (response) {
      setTrials(response);
    }
  }, [response]);


  const [trials, setTrials] = useState<any>([]);
  const [rowEntered, setRowEntered] = useState<DataTableRowMouseEventParams>(null);
  const [rowClicked, setRowClicked] = useState<any>(null);

  const router = useRouter();

  const menu = useRef(null);

  const createCtmlClick = (e) => {
    e.preventDefault();
    router.push('/trials/create');
  }

  const trialMenuItems = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => {
        console.log('Edit');
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
        console.log('Edit');
      }
    },
    {
      label: 'Export',
      icon: 'pi pi-upload',
      command: () => {
        console.log('Edit');
      }
    }
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
        { isShown ?
          <Button icon="pi pi-ellipsis-h" iconPos="right" className="p-button-text p-button-plain" style={ menuButtonStyle }
            onClick={(event) => myClick(event, rowData)} ></Button>
          : <div></div> }
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

  return (
    <>
      {data && <>
        <TopBar />
        {/*<div>Access Token: {data['accessToken']}</div>*/}
        <div className={styles.pageContainer}>
          <div className={styles.titleAndButtonsContainer}>
            <span className={styles.trialsText}>Trials</span>
            <div className={styles.buttonsContainer}>
              <Button label="Import" className="p-button-text p-button-plain" />
              <Button label="Create CTML" className={styles.createCtmlButton} onClick={(e) => createCtmlClick(e)} />
            </div>
          </div>

          <Menu model={trialMenuItems} ref={menu} popup id="popup_menu" className={styles.menu} appendTo={'self'}
                onHide={() => clearRowClicked()}/>

        <div className={styles.tableContainer}>
          <DataTable value={trials} rowHover={true}
                     onRowMouseEnter={(event) => setRowEntered(event.data) }
                     onRowMouseLeave={() => setRowEntered(null) }
                     sortField="createdOn" sortOrder={-1}
                     emptyMessage="No CTML files. Select the 'Create' button to start."
          >
            <Column field="nct_id" header="ID" ></Column>
            <Column field="id" header="" body={subMenuTemplate}></Column>
            <Column field="nickname" header="Nickname"></Column>
            <Column field="principal_investigator" header="Principal Investigator" ></Column>
            <Column field="status" header="Status" sortable></Column>
            <Column field="createdAt" header="Created on" dataType="date"></Column>
            <Column field="updatedAt" header="Modified on" dataType="date"></Column>
          </DataTable>
        </div>

        </div></>}

    </>


  )
}
export default Trials
