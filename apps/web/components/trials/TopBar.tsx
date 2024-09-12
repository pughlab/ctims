import {Menu} from "primereact/menu";
import {useRef} from "react";
import styles from './TopBar.module.scss';
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import useHandleSignOut from "../../hooks/useHandleSignOut";

const TopBar = () => {
  const {handleSignOut} = useHandleSignOut();
  const menu = useRef(null);
  const router = useRouter();

  const {data} = useSession();

  const items = [
    {
      label: 'Sign Out',
      icon: 'pi pi-sign-out',
      command: () => {
        handleSignOut();
      }
    }
  ]

  const getInitials = (name) => {
    const names = name.split(' ');
    let initials = '';
    names.forEach((n) => {
      initials += n[0];
    });
    return initials;
  }

  return (
    <div className={styles.topBar}>
      <div className={styles.logoContainer}>
        <img src={'/assets/ctims-logo.svg'} alt={'logo'} className={styles.logo}/>
      </div>
      <div className={styles.userContainer}>
        <div className={styles.userImage}>
          <span>{getInitials(data.user.name)}</span>
        </div>
        <div className={styles.userName}> {data.user.name} </div>
        <i className="pi pi-angle-down"
           onClick={(event) => menu.current.toggle(event)}
           aria-controls="popup_menu" aria-haspopup></i>
        <Menu model={items} popup ref={menu} id="popup_menu" className={styles.menu} appendTo={'self'} />
      </div>
    </div>

  )
}
export default TopBar;
