/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserId,
  setNotifications,
  setNotificationsFetchLoading,
  setNotificationsFetchError,
  selectNotifications
} from '../main';

export const useFetchNotifications = (notificationsUnread: number, setNotificationsUnread: any) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const notifications = useSelector(selectNotifications);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (notifications.length > 0) {
        return;
      }

      dispatch(setNotificationsFetchLoading());

      if (userId) {
        try {
          const response = await fetch(`/api/users/${userId}/notifications`);
          const data = await response.json();

          let numberUnread = 0;
          data.forEach((notif: any) => {
            if (!notif.isRead) {
              numberUnread++;
            }
          });

          setNotificationsUnread(notificationsUnread + numberUnread);
          dispatch(setNotifications(data));
        } catch (error: any) {
          console.error('Error fetching notifications:', error);
          dispatch(setNotificationsFetchError(error.message));
        }
      }
    };

    fetchNotifications();
  }, [userId, dispatch, notifications.length]);
};