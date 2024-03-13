import {useState, useEffect, useRef} from 'react';
import useIdle, { IdleState } from "../hooks/useIdle";
import { Dialog } from 'primereact/dialog';
import {useRouter} from "next/router";
import useRefreshToken from "../hooks/useRefreshToken";
import useSaveTrial from "../hooks/useSaveTrial";
import {RootState, store} from "../store/store";
import {Toast} from "primereact/toast";
import {signOut} from "next-auth/react";

const IdleComponent = () => {
  const { state: idleState, remaining, count } = useIdle(); // Get the idle state, remaining time, and count from the useIdle hook
  const [showDialog, setShowDialog] = useState(false); // Create a state variable for the dialog visibility
  const [remainingTime, setRemainingTime] = useState(0); // Create a state variable for the remaining time

  const { error, response, loading, refreshTokenOperation } = useRefreshToken(); // Get the error, response, loading, and refreshTokenOperation from the useRefreshToken hook

  const toast = useRef(null);

  const {
    response: saveTrialResponse,
    error: saveTrialError,
    loading: saveTrialLoading,
    saveTrialOperation
  } = useSaveTrial();

  const router = useRouter(); // Get the router object from the useRouter hook

  const IDLE_TIMEOUT = 60; // Set the idle timeout to 60 seconds

  const onHide = () => {
    setShowDialog(false); // Hide the dialog
  };

  useEffect(() => {
    if (idleState === IdleState.Idle) { // If the idle state is Idle
      setShowDialog(true); // Show the dialog
      setRemainingTime(IDLE_TIMEOUT); // Set the remaining time to the idle timeout
    } else { // If the idle state is not Idle
      refreshTokenOperation(); // Refresh the access token
      setShowDialog(false); // Hide the dialog
      setRemainingTime(0); // Reset the remaining time
    }
  }, [idleState]); // Run the effect whenever the idle state changes

  useEffect(() => {
    if (error) {
      // for when unable to fresh with expired refresh token
      signOut({redirect: false}).then(() => {
        router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
      });
    }
  }, [error]);

  useEffect(() => {
    let interval: any;

    if (showDialog) { // If the dialog is visible
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1); // Decrement the remaining time by 1 second
      }, 1000);
    }

    if (remainingTime === 0 && showDialog) { // If the remaining time is 0 and the dialog is visible
      if (interval) {
        clearInterval(interval); // Clear the interval
      }

      // Auto save before timeout and logout
      const currentState = store.getState();
      const {trialModel, ctmlJson} = saveToServer(currentState)
      saveTrialOperation(trialModel, ctmlJson).then(() => {
        localStorage.removeItem('ctims-accessToken') // Remove the access token from local storage
        router.push('/'); // Redirect to the home page
      });
    }

    return () => {
      if (interval)
      {
        clearInterval(interval); // Clear the interval on unmount
      }
    };
  }, [showDialog, remainingTime]); // Run the effect whenever the dialog visibility or remaining time changes

  const saveToServer = (state: RootState) => {
    const ctmlModel = state.finalModelAndErrors.ctmlModel;
    if (ctmlModel && !ctmlModel.trialInformation.trial_id) {
      // @ts-ignore
      toast.current.show({
        severity:
          'error',
        summary: 'Error Saving',
        detail: 'Trial ID is required',
      });
      return;
    }

    const getCtmlJsonOnly = () => {
      let ctmlModelCopy;
      const age_group = ctmlModel.age_group;
      const trialInformation = ctmlModel.trialInformation;
      ctmlModelCopy = {...ctmlModel, ...trialInformation, ...age_group};
      delete ctmlModelCopy.age_group;
      delete ctmlModelCopy.trialInformation;
      delete ctmlModelCopy.ctml_status;
      delete ctmlModelCopy.nickname;
      return ctmlModelCopy;
    }

    const getTrialModelOnly = () => {
      return {
        nct_id: ctmlModel.trialInformation.trial_id,
        nickname: ctmlModel.trialInformation.nickname,
        principal_investigator: ctmlModel.trialInformation.principal_investigator,
        status: ctmlModel.trialInformation.ctml_status,
        protocol_no: ctmlModel.trialInformation.protocol_no,
      }
    }



    const trialModel = getTrialModelOnly();
    const ctmlJson = getCtmlJsonOnly();

    return { trialModel, ctmlJson };

  }

  return (
    <>
      <Toast ref={toast} position="top-center" />
      <div>
        <Dialog data-testid="dialog" header="Idle Warning" visible={showDialog} onHide={onHide} closable={false}>
          <p style={{margin: '10px'}}>You will timeout in {remainingTime} seconds. Please note, any unsaved work will be lost.</p>
        </Dialog>
      </div>
    </>
  );
};

export default IdleComponent;
