import {Menu} from "primereact/menu";
import {useRef} from "react";
import styles from './TopBar.module.scss';

const TopBar = () => {

  const menu = useRef(null);

  const items = [
    {
      label: 'Sign Out',
      icon: 'pi pi-sign-out',
      command: () => {
        console.log('Sign Out');
      }
    }
  ]

  return (
    <div className={styles.topBar}>
      <div className={styles.logoContainer}>
        <img src={'/assets/ctims-logo.svg'} alt={'logo'} className={styles.logo}/>
      </div>
      <div className={styles.userContainer}>
        <div className={styles.userImage}>
          <span>AS</span>
        </div>
        <div className={styles.userName}> Anton Sukhovatkin </div>
        <i className="pi pi-angle-down"
           onClick={(event) => menu.current.toggle(event)}
           aria-controls="popup_menu" aria-haspopup></i>
        <Menu model={items} popup ref={menu} id="popup_menu" className={styles.menu} appendTo={'self'} />
      </div>
    </div>

  )
}
export default TopBar;
