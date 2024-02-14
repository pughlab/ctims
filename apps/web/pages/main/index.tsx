import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {TabPanel, TabView} from "primereact/tabview";
import IdleComponent from "../../components/IdleComponent";
import TopBar from "../../components/trials/TopBar";
import styles from './index.module.scss';
import Trials from '../../components/trials/Trials';
import Results from '../../components/trials/Results';
import useGetApiInfo from "apps/web/hooks/useGetApiInfo";

const Main = () => {

  const {data, status: sessionStatus} = useSession()

  const [activeTab, setActiveTab] = useState(0);

  const { error, response, loading, operation} = useGetApiInfo();

  useEffect(() => {
    operation();
  }, [])

  useEffect(() => {
    if (!data) {
      return;
    }
    localStorage.setItem('ctims-accessToken', data['accessToken'] as string);
    console.log('data', data)

    setActiveTab(0);
  }, [data])

  return (
    <>
      <IdleComponent />
      {sessionStatus === 'loading' && <div>Loading...</div>}
      {sessionStatus === 'authenticated' && <>
        <TopBar/>
        <div className={styles.pageContainer}>
          <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
            <TabPanel header="Trials">
              <Trials/>
            </TabPanel>
            <TabPanel header="Results">
              <Results/>
            </TabPanel>
          </TabView>
        </div>
        <div className={styles.versionContainer}>CTIMS version {response}</div>
      </>}
      { sessionStatus === 'unauthenticated' && <div>Please log in to view this page.</div>}
    </>
  );
}
export default Main;
