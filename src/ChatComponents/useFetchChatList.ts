/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { socket } from '../socket';
import {
  selectUserId,
  setChatList,
  setChatFetchLoading,
  setChatFetchError,
  selectChatList
} from '../main';

export const useFetchChatList = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const chatList = useSelector(selectChatList);

  useEffect(() => {
    socket.emit("join_notification_room", userId);

    const fetchChatList = async () => {
      if (chatList.length > 0) {
        return;
      }

      dispatch(setChatFetchLoading());

      if (userId) {
        try {
          const response = await fetch(`/api/users/${userId}/chats`);
          const data = await response.json();
          dispatch(setChatList(data));
        } catch (error: any) {
          console.error('Error fetching chat list:', error);
          dispatch(setChatFetchError(error.message));
        }
      }
    };

    fetchChatList();
  }, [userId, dispatch, chatList.length]);
};