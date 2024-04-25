import React, {useEffect, useRef, useState} from "react";
import {signOut, useSession} from "next-auth/react";
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
import {BlockUI} from "primereact/blockui";
import {ProgressSpinner} from "primereact/progressspinner";
import {useDispatch, useSelector} from "react-redux";
import {RootState, store} from "../../store/store";
import MatchMinerConsole from "../../components/matchminer/MatchMinerConsole";
import {setIsAccessTokenSet} from "../../store/slices/contextSlice";
import {logout} from "../api/auth/[...nextauth]";
import process from "process";
import {useRouter} from "next/router";

const Main = () => {

  const {data: sessionData, status: sessionStatus} = useSession()

  const [activeTab, setActiveTab] = useState(0);

  // trial group information
  const [selectedTrialGroup, setSelectedTrialGroup] = useState<{ plainRole: string, isAdmin: boolean }>(null);
  const { response: getTrialsForUsersInGroupResponse, error: getTrialsForUsersInGroupError, loading: getTrialsForUsersInGroupLoading, getTrialsForUsersInGroupOperation } = useGetTrialsForUsersInGroup();
  const retrieveTrialsErrorToast = useRef(null);
  const [trials, setTrials] = useState<any>([]);

  const selectedTrialGroupFromState = useSelector((state: RootState) => state.context.seletedTrialGroupId);
  const selectedTrialGroupIsAdminFromState = useSelector((state: RootState) => state.context.isTrialGroupAdmin);
  const isLongOperationFromState = useSelector((state: RootState) => state.context.isLongOperation);
  const isLoggedInFromState = useSelector((state: RootState) => state.context.isAccessTokenSet);
  const dispatch = useDispatch();
  const router = useRouter();

  // TODO: abstract the refreshTokenOperation set and clear interval to a hook
  useEffect(() => {
    // sessionData gets callback twice, 1st time is server side rendering (denoted by loading status)
    // 2nd time is client side which will be either authenticated or unauthenticated
    if (!sessionData && sessionStatus !== 'loading') {
      // if there's no session, should also log out
      signOut({redirect: false}).then(() => {
        store.dispatch(logout());
        router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
      });
    }
    // only set the access token first time from login
    if (sessionData && !isLoggedInFromState) {
      localStorage.setItem('ctims-accessToken', sessionData['accessToken'] as string);
      dispatch(setIsAccessTokenSet(true));
    }

    setActiveTab(0);
  }, [sessionData])

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
    }
  }, [getTrialsForUsersInGroupResponse]);

  const onTrialDeleted = () => {
    getTrialsForUsersInGroupOperation(selectedTrialGroup.plainRole);
  }

  return (
    <>
      <div className={styles.container}>
        <BlockUI blocked={isLongOperationFromState}>
        { isLongOperationFromState && (<div className={styles.centerLoading}><ProgressSpinner></ProgressSpinner></div>)}
        <IdleComponent />
        <Toast ref={retrieveTrialsErrorToast}></Toast>
        {sessionStatus === 'loading' && <div>Loading...</div>}
        {sessionStatus === 'authenticated' && <>
          <TopBar/>
          <div className={styles.pageContainer}>
            <TrialGroupsDropdown roles={(sessionData as unknown as any).roles} onTrialGroupSelected={onTrialGroupSelected} />
            <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
              <TabPanel header="Trials">
                <Trials selectedTrialGroup={selectedTrialGroup} trials={trials} onTrialDeleted={onTrialDeleted} getTrialsForUsersInGroupLoading={getTrialsForUsersInGroupLoading}/>
              </TabPanel>
              <TabPanel header="Results">
                <Results trials={trials} getTrialsForUsersInGroupLoading={getTrialsForUsersInGroupLoading}/>
              </TabPanel>
              {sessionData.user.name === 'CTIMS Test' && (
                <TabPanel header="Matchminer Console">
                  <MatchMinerConsole/>
                </TabPanel>
              )}
            </TabView>
          </div>
          <FooterComponent/>
        </>}
        { sessionStatus === 'unauthenticated' && <div>Please log in to view this page.</div>}
        </BlockUI>
      </div>
    </>
  );
}
export default Main;
