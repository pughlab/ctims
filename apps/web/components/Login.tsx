import styles from './Login.module.scss';
import {InputText} from "primereact/inputtext";
import {useState} from "react";
import {NextRouter, useRouter} from "next/router";
import useHasMounted from "../hooks/useHasMounted";
import Layout from "./Layout";
import {Button} from "primereact/button";

const Login = () => {
  const hasMounted = useHasMounted();
  const [username, setUsername] = useState<any>();
  const [password, setPassword] = useState<any>();

  const router: NextRouter = useRouter();


  const handleLogin = (e) => {
    // need prevent default, otherwise the page will be reloaded
    e.preventDefault();
    console.log('Login');
    router.push('/trials');
  }

  if(!hasMounted) {
    return null;
  }

  return (
    <Layout>
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
              <InputText className={styles.usernameInput} onChange={(e) => setUsername(e.target.value)}/>
              {/*<small className="p-error block">Fill out this field.</small>*/}
            </div>
            <div className={styles.passwordContainer}>
              <div className={styles.password}>Password</div>
              <InputText className={styles.passwordInput} onChange={(e) => setPassword(e.target.value)}/>
              {/*<small className="p-error block">Fill out this field.</small>*/}
            </div>
              <Button label="Sign In" onClick={(e) => handleLogin(e)} />
            <div className={styles.forgotPassword}>Forgot Password</div>
          </form>

        </div>
      </div>
    </div>
    </Layout>
  );
}

export default Login;
