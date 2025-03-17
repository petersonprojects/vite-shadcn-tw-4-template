/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { socket } from '../socket';

export const useChatHistory = (
  openChats: any,
  setOpenChats: any,
  setChatsForCache: any
) => {

  useEffect(() => {
    const getOlderMessages = ([moreHistory, roomName]: any) => {

      console.log("openChats: ", openChats);

      const openChat = openChats.find((chatObj: any) => chatObj.roomName === roomName);
      
      // only change state for the user that requested new history
      if (!openChat) return;

      // create a map for de-duplication and order tracking
      const messagesMap = new Map();
      openChat.messages.forEach((msg: any, index: any) => messagesMap.set(msg.id, { msg, index }));

      // filter moreHistory, keeping only new messages
      const filteredHistory = moreHistory.filter((msg: any) => !messagesMap.has(msg.id));

      // combine with existing messages, respecting original order
      const uniqueMessages = filteredHistory.concat(openChat.messages.map((msg: any) => messagesMap.get(msg.id).msg));

      setOpenChats((prevState: any) => {
        const newState = prevState.map((chat: any) => {
          if (chat.roomName === roomName) {
            return {
              ...chat,
              messages: uniqueMessages,
              shouldLoadMore: moreHistory.length >= 10 ? chat.shouldLoadMore : false
            };
          }
          return chat;
        });
        return newState;
      });

      setChatsForCache((prevState: any) => {
        const newState = prevState.map((chat: any) => {
          if (chat.roomName === roomName) {
            return {
              ...chat,
              messages: uniqueMessages,
              shouldLoadMore: moreHistory.length >= 10 ? chat.shouldLoadMore : false
            };
          }
          return chat;
        });
        return newState;
      });
    };

    const handleChatHistory = ([initialChatHistory, roomName]: any) => {
      
      const openChat = openChats.find((chatObj: any) => chatObj.roomName === roomName);

      // only change state for the user that requested new history
      if (!openChat) return;

      setOpenChats((prevState: any) => {
        const indexRef = prevState.findIndex((chatObj: any) => chatObj.roomName === roomName);

        const newState = [...prevState];

        newState[indexRef] = {
          ...newState[indexRef],
          // if it sends back a response that has a noChatHistory key, messages is empty
          // else initial history
          isLoadingInitial: false,
          messages: initialChatHistory.noChatHistory ? [] : initialChatHistory
        };

        return newState;
      });

      setChatsForCache((prevState: any) => {
        const indexRef = prevState.findIndex((chatObj: any) => chatObj.roomName === roomName);

        const newState = [...prevState];

        newState[indexRef] = {
          ...newState[indexRef],
          // if it sends back a response that has a noChatHistory key, messages is empty
          // else initial history
          isLoadingInitial: false,
          messages: initialChatHistory.noChatHistory ? [] : initialChatHistory
        };

        return newState;
      });
    };

    socket.on('chat_history', handleChatHistory);
    socket.on('older_messages', getOlderMessages);

    return () => {
      socket.off('chat_history', handleChatHistory); // Clean up listener
      socket.off('older_messages', getOlderMessages);
    };
  }, [openChats]);
};