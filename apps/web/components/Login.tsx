import styles from './Login.module.scss';
import {InputText} from "primereact/inputtext";
import { Button } from 'primereact/button';
import {useState} from "react";

export const Login = () => {

  const [username, setUsername] = useState<any>('Username');
  const [password, setPassword] = useState<any>('Password');

  return (
    <div className={styles.loginBg}>
      <div className={styles.frame}>
        <div className={styles.card}>
          <div className={styles.logoContainer}>
            <img src={'/assets/ctims-logo.svg'} alt={'logo'} className={styles.logo}/>
          </div>

          <div className={styles.heading}>
            <div className={styles.signIn}>Sign in</div>
            <span className={styles.description}>Use your T-ID, RMP ID, Research ID, or UHN email address to sign in.</span>
          </div>
          <form>
            <div className={styles.usernameContainer}>
              <div className={styles.username}>Username</div>
              <InputText className={styles.usernameInput} value={username} onChange={(e) => setUsername(e.target.value)}/>
              {/*<small className="p-error block">Fill out this field.</small>*/}
            </div>
            <div className={styles.passwordContainer}>
              <div className={styles.password}>Password</div>
              <InputText className={styles.passwordInput} value={password} onChange={(e) => setPassword(e.target.value)}/>
              {/*<small className="p-error block">Fill out this field.</small>*/}
            </div>
            <Button label="Sign In" />
            <div className={styles.forgotPassword}>Forgot Password</div>
          </form>

        </div>
      </div>
    </div>
  );
}
