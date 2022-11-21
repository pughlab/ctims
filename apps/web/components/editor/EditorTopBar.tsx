import styles from './EditorTopBar.module.scss';
import {useRouter} from "next/router";

const EditorTopBar = () => {

  const router = useRouter();

  const backClick = (e) => {
    e.preventDefault();
    router.back();
  }

  return (
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
      </div>
    </div>
  )
}
export default EditorTopBar;
