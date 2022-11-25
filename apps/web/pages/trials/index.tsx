import styles from './index.module.scss';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import TopBar from "../../components/trials/TopBar";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import React from 'react';
import {Menu} from "primereact/menu";

const Trials = () => {

  const [trials, setTrials] = useState<any>([]);

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
        status: 'Active',
        createdOn: '2021-01-01 by Dr. John Doe',
        updatedOn: '2021-01-01 by Dr. John Doe',
      },
      {
        id: 2,
        nickname: 'Trial 2',
        principalInvestigator: 'Dr. John Doe',
        status: 'Active',
        createdOn: '2021-01-01 by Dr. John Doe',
        updatedOn: '2021-01-01 by Dr. John Doe',
      }
    ]
    setTrials(trials);
  }, []);

  const menuButtonStyle = {
    color: 'black',
  }
  const subMenuTemplate = (rowData) => {
    return (
    <div className={styles.myHiddenText}>
      <Button icon="pi pi-ellipsis-h" iconPos="right" className="p-button-text p-button-plain" style={ menuButtonStyle }
          onClick={(event) => menu.current.toggle(event)} ></Button>
    </div>
    );
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

        <div className={styles.tableContainer}>
          <DataTable value={trials} rowHover={true}>
            <Column field="id" header="ID"></Column>
            <Column field="id" header="" body={subMenuTemplate}></Column>
            <Column field="nickname" header="Nickname"></Column>
            <Column field="principalInvestigator" header="Principal Investigator" ></Column>
            <Column field="status" header="Status"></Column>
            <Column field="createdOn" header="Created on"></Column>
            <Column field="updatedOn" header="Modified on"></Column>
          </DataTable>
        </div>

        <Menu model={trialMenuItems} ref={menu} popup id="popup_menu" className={styles.menu} appendTo={'self'}
              onMouseLeave={(event) => menu.current.hide}/>
      </div>
    </>


  )
}
export default Trials
