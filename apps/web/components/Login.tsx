import styles from './Login.module.scss';
import {InputText} from "primereact/inputtext";
import {useState} from "react";

export const Login = () => {

  const [username, setUsername] = useState<any>('Username');
  const [password, setPassword] = useState<any>('Password');

  return (
      <div className={styles.frame}>
        <div className="logo-container">
          <img src="assets/layout/images/RDS-logo.svg" alt="RDS Logo"/>
        </div>
        <div className="card">
          <div className="heading">
            <div className="sign-in">Sign in</div>
            <span className="description">Use your UHN T-ID or email and password to sign in.</span>
          </div>
          <form>
          <div className="username-container">
            <label htmlFor="username" className="username">Username</label>
            <InputText value={username} onChange={(e) => setUsername(e.target.value)} />
            <small className="p-error block">Fill out this field.</small>
        </div>
        <div className="password-container">
          <label htmlFor="password" className="password">Password</label>
          <InputText value={password} onChange={(e) => setPassword(e.target.value)} />
          <small className="p-error block">Fill out this field.</small>
      </div>
    </form>
  <button type="submit" className="sign-in-button" ></button>
    </div>
    </div>
  );
}
