import React, {useEffect, useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {TabPanel, TabView} from "primereact/tabview";
import IdleComponent from "../../components/IdleComponent";
import TopBar from "../../components/trials/TopBar";
import styles from './index.module.scss';
import Trials from '../../components/trials/Trials';
import Results from '../../components/trials/Results';
import FooterComponent from "apps/web/components/FooterComponent";
import TrialGroupsDropdown from "../../components/trials/TrialGroupsDropdown";
import useGetTrialsForUsersInGroup from "../../hooks/useGetTrialsForUsersInGroup";
import {Toast} from "primereact/toast";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import MatchMinerConsole from "../../components/matchminer/MatchMinerConsole";
import useRefreshToken from "../../hooks/useRefreshToken";
let jwt = require('jwt-simple');

const Main = () => {

  const {data, status: sessionStatus} = useSession()

  const [activeTab, setActiveTab] = useState(0);

  // trial group information
  const [selectedTrialGroup, setSelectedTrialGroup] = useState<{ plainRole: string, isAdmin: boolean }>(null);
  const { response: getTrialsForUsersInGroupResponse, error: getTrialsForUsersInGroupError, loading: getTrialsForUsersInGroupLoading, getTrialsForUsersInGroupOperation } = useGetTrialsForUsersInGroup();
  const retrieveTrialsErrorToast = useRef(null);
  const [trials, setTrials] = useState<any>([]);

  const selectedTrialGroupFromState = useSelector((state: RootState) => state.context.seletedTrialGroupId);
  const selectedTrialGroupIsAdminFromState = useSelector((state: RootState) => state.context.isTrialGroupAdmin);

  const { error, response, loading, refreshTokenOperation } = useRefreshToken();
  const refreshTokenTimeout = useRef(null);

  useEffect(() => {
    if (!data) {
      stopRefreshTokenTimer();
      return;
    }
    localStorage.setItem('ctims-accessToken', data['accessToken'] as string);
    startRefreshTokenTimer();
    console.log('data', data)

    setActiveTab(0);
  }, [data])

  useEffect(() => {
    if (selectedTrialGroupFromState) {
      setSelectedTrialGroup({ plainRole: selectedTrialGroupFromState, isAdmin: selectedTrialGroupIsAdminFromState });
      getTrialsForUsersInGroupOperation(selectedTrialGroupFromState);
    }
  }, [selectedTrialGroupFromState, selectedTrialGroupIsAdminFromState]);

  const onTrialGroupSelected = (selectedTrialGroup: {role: string, code: string}) => {
    // get the trials
    const plainRole = selectedTrialGroup.code.replace('-admin', '');
    setSelectedTrialGroup({ plainRole, isAdmin: selectedTrialGroup.code.includes('admin') });
    getTrialsForUsersInGroupOperation(plainRole);
  }

  useEffect(() => {
    if (getTrialsForUsersInGroupError) {
      retrieveTrialsErrorToast.current.show({
        severity: "error",
        summary: 'Error fetching trials',
      });
    }
  }, [getTrialsForUsersInGroupError]);

  useEffect(() => {
    if (getTrialsForUsersInGroupResponse) {
      setTrials(getTrialsForUsersInGroupResponse);
      console.log('response', getTrialsForUsersInGroupResponse);
    }
  }, [getTrialsForUsersInGroupResponse]);

  const onTrialDeleted = () => {
    getTrialsForUsersInGroupOperation(selectedTrialGroup.plainRole);
  }

  useEffect(() => {
    // Cleanup function to stop the timer when the component unmounts
    return () => stopRefreshTokenTimer();
  }, []);

  // refresh access token that runs periodically
  const startRefreshTokenTimer = () => {

    const token: any = jwt.decode(localStorage.getItem('ctims-accessToken'), '', true);
    const expires = new Date(token.exp * 1000);
    // refresh token 2 minutes before it expires
    const timeout = expires.getTime() - Date.now() - (2 * 60 * 1000);
    stopRefreshTokenTimer();
    refreshTokenTimeout.current = setInterval(() => refreshTokenOperation(), timeout);
  }

  const stopRefreshTokenTimer = () => {
    if (refreshTokenTimeout.current) {
      clearInterval(refreshTokenTimeout.current);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <IdleComponent />
        <Toast ref={retrieveTrialsErrorToast}></Toast>
        {sessionStatus === 'loading' && <div>Loading...</div>}
        {sessionStatus === 'authenticated' && <>
          <TopBar/>
          <div className={styles.pageContainer}>
            <TrialGroupsDropdown roles={(data as unknown as any).roles} onTrialGroupSelected={onTrialGroupSelected} />
            <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
              <TabPanel header="Trials">
                <Trials selectedTrialGroup={selectedTrialGroup} trials={trials} onTrialDeleted={onTrialDeleted} getTrialsForUsersInGroupLoading={getTrialsForUsersInGroupLoading}/>
              </TabPanel>
              <TabPanel header="Results">
                <Results trials={trials} getTrialsForUsersInGroupLoading={getTrialsForUsersInGroupLoading}/>
              </TabPanel>
              {data.user.name === 'CTIMS Test' && (
                <TabPanel header="Matchminer Console">
                  <MatchMinerConsole/>
                </TabPanel>
              )}
            </TabView>
          </div>
          <FooterComponent/>
        </>}
        { sessionStatus === 'unauthenticated' && <div>Please log in to view this page.</div>}
      </div>
    </>
  );
}
export default Main;
