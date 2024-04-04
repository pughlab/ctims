import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

// Define an enum for the idle state
export enum IdleState {
  Active = 'Active',
  Idle = 'Idle'
}

const convertMinutesToMilliseconds = (minutes) => {
  return minutes * 60000;
}

const useIdle = () => {
  // Define state variables for the idle state, action count, and remaining time
  const [state, setState] = useState<IdleState>(IdleState.Active);
  const [count, setCount] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);

  const TIMEOUT = convertMinutesToMilliseconds(14);

  // Define event handlers for idle, active, and action events
  const onIdle = () => {
    setState(IdleState.Idle);
  };

  const onActive = () => {
    setState(IdleState.Active);
  };

  const onAction = (event?: Event) => {
    setCount(count + 1);
    // console.log('user did something', count, event);
    // console.log(event);
  };

  // Use the useIdleTimer hook to get the remaining time and set up event handlers
  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    events: ['mousemove', 'keydown', 'mousedown', 'touchstart', 'click', 'mousewheel'],
    timeout: TIMEOUT,
    throttle: 500
  });

  // Use the useEffect hook to update the remaining time every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [getRemainingTime]);

  // Return an object with the state, action count, and remaining time
  return { state, count, remaining };
};

export default useIdle;
