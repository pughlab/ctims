import React, { useState, useEffect } from 'react';
import useIdle, { IdleState } from "../hooks/useIdle";
import { Dialog } from 'primereact/dialog';
import {useRouter} from "next/router";


const IdleComponent: React.FC = () => {
  const { state: idleState, remaining, count } = useIdle();
  const [showDialog, setShowDialog] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const router = useRouter();

  const IDLE_TIMEOUT = 5;

  const onHide = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    if (idleState === IdleState.Idle) {
      setShowDialog(true);
      setRemainingTime(IDLE_TIMEOUT);
    } else {
      setShowDialog(false);
      setRemainingTime(0);
    }
  }, [idleState]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (showDialog) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (remainingTime === 0 && showDialog) {
      console.log("Time is up!");
      clearInterval(interval)
      localStorage.removeItem('ctims-accessToken')
      router.push('/');
    }

    return () => {
      clearInterval(interval);
    };
  }, [showDialog, remainingTime]);

  return (
    <div>
      <Dialog header="Idle Warning" visible={showDialog} onHide={onHide} closable={false}>
        <p>Time remaining: {remainingTime} seconds</p>
      </Dialog>
    </div>
  );
};

export default IdleComponent;
