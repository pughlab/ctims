import styles from './Login.module.scss';
import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import {NextRouter, useRouter} from "next/router";
import useHasMounted from "../hooks/useHasMounted";
import Layout from "./Layout";
import {Button} from "primereact/button";
import {useDispatch, useSelector} from "react-redux";
import {increment} from "../store/slices/counterSlice";
import {signIn} from "next-auth/react";
import {Password} from "primereact/password";
import { Toast } from "primereact/toast";

const Login = () => {
  const hasMounted = useHasMounted();
  const [username, setUsername]: [string, React.Dispatch<any>] = useState<any>();
  const [password, setPassword]: [string, React.Dispatch<any>] = useState<any>();
  const [usernameIsInvalid, setUsernameIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

  const loginErrorToast = useRef<Toast>();

  const dispatch = useDispatch();

  const router: NextRouter = useRouter();

  const showInvalidLoginToast =  (message) => {
    loginErrorToast.current.show({
      severity: "error",
      summary: message
    });
  }

  const handleUsernameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);

    if (value === '') {
      setUsernameIsInvalid(true);
    } else {
      setUsernameIsInvalid(false);
    }
  };

  const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);

    if (value === '') {
      setPasswordIsInvalid(true);
    } else {
      setPasswordIsInvalid(false);
    }
  };

  const usernameClasses = `${styles.usernameInput} ${usernameIsInvalid ? 'p-invalid block' : ''}`;
  const passwordClasses = `${styles.passwordInput} ${passwordIsInvalid ? 'p-invalid block' : ''}`;

  const handleLogin = async (e) => {
    // need prevent default, otherwise the page will be reloaded
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      showInvalidLoginToast("Please enter your credentials to sign in.");
      return;
    }
    const result = await signIn('credentials', {username, password, redirect: false})
    console.log('result', result);
    if (result.ok) {
      router.push('/trials');
    } else {
      showInvalidLoginToast(`Unauthorized - ${username}`);
    }
  }

  if(!hasMounted) {
    return null;
  }

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(increment());
    console.log('Forgot password');
  }

  return (
    <Layout>
    <Toast ref={loginErrorToast}></Toast>
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
              <InputText className={usernameClasses} onChange={handleUsernameInputChange}/>
              {usernameIsInvalid && <small className="p-error block">Fill out this field.</small>}
            </div>
            <div className={styles.passwordContainer}>
              <div className={styles.password}>Password</div>
              <Password className={passwordClasses}
                        inputClassName={styles.passwordInputText}
                        onChange={handlePasswordInputChange}
                        feedback={false}
              />
              {passwordIsInvalid && <small className="p-error block">Fill out this field.</small>}
            </div>
              <Button label="Sign In" onClick={(e) => handleLogin(e)} />
            <div className={styles.forgotPassword} onClick={handleForgotPassword}>Forgot Password</div>
          </form>

        </div>
      </div>
    </div>
    </Layout>
  );
}

export default Login;
