import { useState, useEffect } from 'react';
import useIdle, { IdleState } from "../hooks/useIdle";
import { Dialog } from 'primereact/dialog';
import {useRouter} from "next/router";
import useRefreshToken from "../hooks/useRefreshToken";

const IdleComponent = () => {
  const { state: idleState, remaining, count } = useIdle(); // Get the idle state, remaining time, and count from the useIdle hook
  const [showDialog, setShowDialog] = useState(false); // Create a state variable for the dialog visibility
  const [remainingTime, setRemainingTime] = useState(0); // Create a state variable for the remaining time

  const { error, response, loading, refreshTokenOperation } = useRefreshToken(); // Get the error, response, loading, and refreshTokenOperation from the useRefreshToken hook

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
      localStorage.removeItem('ctims-accessToken') // Remove the access token from local storage
      router.push('/'); // Redirect to the home page
    }

    return () => {
      if (interval)
      {
        clearInterval(interval); // Clear the interval on unmount
      }
    };
  }, [showDialog, remainingTime]); // Run the effect whenever the dialog visibility or remaining time changes

  return (
    <div>
      <Dialog data-testid="dialog" header="Idle Warning" visible={showDialog} onHide={onHide} closable={false}>
        <p style={{margin: '10px'}}>You will timeout in {remainingTime} seconds. Please note, any unsaved work will be lost.</p>
      </Dialog>
    </div>
  );
};

export default IdleComponent;
