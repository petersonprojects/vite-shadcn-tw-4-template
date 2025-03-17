/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState, useEffect} from 'react'
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout, setClearNotifications, setClearChatList } from '../main';

export default function IdleTimer() {

    const [remaining, setRemaining] = useState<number>(0);
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const convertSeconds = (seconds:number) => {
      const minutes = Math.floor(seconds / 60);
      const secondsLeft = seconds % 60;
      return minutes + " minutes and " + secondsLeft + " seconds";
    }

      const onIdle = () => {
          console.log('idle for 20 mins');

          // clear local storage user data
  
          localStorage.clear();
          dispatch(logout());
          dispatch(setClearNotifications());
          dispatch(setClearChatList());
          navigate("/logout");

      }
      
        const { getRemainingTime } = useIdleTimer({
          onIdle,
          timeout: 20 * 60 * 1000, //20 minute idle timeout
        })
  
      useEffect(() => {
          const interval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000))
          }, 1000);
      
          return () => {
            clearInterval(interval);
          }
      });
  

  return (
    <></>
  )
}
