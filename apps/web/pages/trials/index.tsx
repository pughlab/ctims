import styles from './index.module.scss';
import { Button } from 'primereact/button';

import TopBar from "../../components/trials/TopBar";

const Trials = () => {

  return (
    <>
      <TopBar />
      <div className={styles.pageContainer}>
        <div className={styles.titleAndButtonsContainer}>
          <span className={styles.trialsText}>Trials</span>
          <div className={styles.buttonsContainer}>
            <Button label="Import" className="p-button-text p-button-plain" />
            <Button label="Create CTML" className={styles.createCtmlButton} />
          </div>

        </div>
      </div>
    </>


  )
}
export default Trials
