import styles from './index.module.scss';
import { Button } from 'primereact/button';
import {DataTable, DataTableRowMouseEventParams} from 'primereact/datatable';
import { Column } from 'primereact/column';

import TopBar from "../../components/trials/TopBar";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import React from 'react';
import {Menu} from "primereact/menu";

const Trials = () => {

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

  useEffect(() => {
    const trials = [
      {
        id: 1,
        nickname: 'Trial 1',
        principalInvestigator: 'Dr. John Doe',
        status: 'Draft',
        createdOn: '2021-01-01 by Dr. John Doe',
        updatedOn: '2021-01-01 by Dr. John Doe',
      },
      {
        id: 2,
        nickname: 'Trial 2',
        principalInvestigator: 'Dr. Who',
        status: 'In review',
        createdOn: '2021-02-02 by Dr. Who',
        updatedOn: '2021-02-02 by Dr. Who',
      },
      {
        id: 3,
        nickname: 'Trial 3',
        principalInvestigator: 'Dr. Dolittle',
        status: 'Complete',
        createdOn: '2021-03-03 by Dr. Dolittle',
        updatedOn: '2021-03-03 by Dr. Dolittle',
      }
    ]
    setTrials(trials);
  }, []);

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
      <TopBar />
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
            <Column field="id" header="ID" ></Column>
            <Column field="id" header="" body={subMenuTemplate}></Column>
            <Column field="nickname" header="Nickname"></Column>
            <Column field="principalInvestigator" header="Principal Investigator" ></Column>
            <Column field="status" header="Status" sortable></Column>
            <Column field="createdOn" header="Created on" ></Column>
            <Column field="updatedOn" header="Modified on"></Column>
          </DataTable>
        </div>

      </div>
    </>


  )
}
export default Trials
