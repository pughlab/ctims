import styles from './index.module.scss';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import TopBar from "../../components/trials/TopBar";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const Trials = () => {

  const [trials, setTrials] = useState<any>([]);

  const router = useRouter();

  const createCtmlClick = (e) => {
    e.preventDefault();
    router.push('/trials/create');
  }

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
          <DataTable value={trials}>
            <Column field="id" header="ID"></Column>
            <Column field="nickname" header="Nickname"></Column>
            <Column field="principalInvestigator" header="Principal Investigator"></Column>
            <Column field="status" header="Status"></Column>
            <Column field="createdOn" header="Created on"></Column>
            <Column field="updatedOn" header="Modified on"></Column>
          </DataTable>
        </div>
      </div>
    </>


  )
}
export default Trials
