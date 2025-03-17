/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useRealTimeNotifications.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { markNotificationsAsRead } from '../main';
import { socket } from '../socket';

export const useRealTimeNotifications = ( openChats: any, userId: any, setRealTimeNotifications: any, setNotificationsUnread: any) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const receiveRealTimeNotification = (notificationObject: any) => {
      // Get our chatId from the sender that's passed back from the socket
      const chatId = notificationObject.senderId;

      // Check if the chat is already open
      const isChatOpen = openChats.some((chat: any) => chat.id === chatId);

      console.log("notificationObject: ", notificationObject);

      // Only update notifications if the chat isn't already open
      if (!isChatOpen) {
        setRealTimeNotifications((prevState: any) => [...prevState, notificationObject]);
      } else {
        // if the chat is open -- immediate mark as read in db / front end is not updating in real-time
        // or on the refresh update
        markNotificationsAsReadInDatabase(chatId, dispatch);
      }

      // Increment unread
      setNotificationsUnread((prev: number) => prev + 1);
    };

    const markNotificationsAsReadInDatabase = async (senderId: string, dispatch: any) => {
      try {
        await fetch(`/api/users/${userId}/notifications/markAsRead`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ senderId }),
        });
        dispatch(markNotificationsAsRead(senderId));
      } catch (error) {
        console.error('Error marking notifications as read in database:', error);
      }
    };

    socket.on('new_notification', receiveRealTimeNotification);

    return () => {
      socket.off('new_notification', receiveRealTimeNotification);
    };
  }, [openChats, userId, setRealTimeNotifications, setNotificationsUnread, dispatch]);
};