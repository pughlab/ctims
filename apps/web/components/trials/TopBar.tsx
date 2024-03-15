import {Menu} from "primereact/menu";
import {useRef} from "react";
import styles from './TopBar.module.scss';
import {signOut, useSession} from "next-auth/react";
import * as process from "process";
import {useRouter} from "next/router";
import {store} from "../../store/store";
import {logout} from "../../pages/api/auth/[...nextauth]";

const TopBar = () => {

  const menu = useRef(null);
  const router = useRouter();

  const {data} = useSession();

  const items = [
    {
      label: 'Sign Out',
      icon: 'pi pi-sign-out',
      command: () => {
        // signOut({callbackUrl: '/', redirect: true}).then(() => {
        signOut({redirect: false}).then(() => {
          store.dispatch(logout());
          router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL)
        });

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
