import { useEffect } from 'react';
import useGetApiInfo from '../hooks/useGetApiInfo';
import styles from "./Footer.module.scss"
const FooterComponent = () => {

  const { 
    error: getApiInfoError,
    response: getApiInfoResponse,
    loading: getApiInfoLoading, 
    operation: getApiInfoOperation
  } = useGetApiInfo();

  useEffect(() => {
    getApiInfoOperation();
  }, [])

  return (
    <div className={styles.versionContainer}>CTIMS version {getApiInfoResponse}</div>
  );
};

export default FooterComponent;
