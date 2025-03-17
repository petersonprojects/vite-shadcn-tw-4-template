/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { socket } from '../socket';

export const useHandleNewMessage = (openChats: any, setOpenChats: any, chatsForCache: any, setChatsForCache: any) => {
  useEffect(() => {
    const handleNewMessage = (data: any) => {
      const updatedLastTenMessages = data[0];
      const roomName = data[1];

      const existingMessagesMap = new Map();

      // find the openChat we're dealing with
      const openChat = openChats.find((chatObj: any) => chatObj.roomName === roomName);

      if (openChat) {
        openChat.messages.forEach((msg: any, index: number) => existingMessagesMap.set(msg.id, { msg, index }));

        const updatedMessages = updatedLastTenMessages.reduce((acc: any, msg: any) => {
          if (!existingMessagesMap.has(msg.id)) {
            // If the message doesn't already exist, add it to the result array
            acc.push(msg);
            existingMessagesMap.set(msg.id, { msg, index: acc.length - 1 }); // Update the map with the new message
          }
          return acc;
        }, [...openChat.messages]);

        // Sort the messages based on their original indices
        updatedMessages.sort((a: any, b: any) => {
          return existingMessagesMap.get(a.id).index - existingMessagesMap.get(b.id).index;
        });

        // Set state of specific open chat to add the updated messages
        setOpenChats((prevState: any) => {
          const newState = prevState.map((chat: any) => {
            if (chat.roomName === roomName) {
              return {
                ...chat,
                messages: updatedMessages
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
                messages: updatedMessages
              };
            }
            return chat;
          });
          return newState;
        });

      } else {
        // When there is no openChat, we need to update chatsForCache only
        const existingMessagesMapForCache = new Map();

        // Create a set of messages already present in the cache for the room
        const currentRoomMessages = chatsForCache.find((chat: any) => chat.roomName === roomName)?.messages || [];

        currentRoomMessages.forEach((msg: any) => existingMessagesMapForCache.set(msg.id, true));

        const updatedMessagesForCache = updatedLastTenMessages.reduce((acc: any, msg: any) => {
          if (!existingMessagesMapForCache.has(msg.id)) {
            // If the message doesn't already exist, add it to the result array
            acc.push(msg);
            existingMessagesMapForCache.set(msg.id, true); // Mark this message as seen
          }
          return acc;
        }, []);

        // Add the newly found messages to the chatsForCache without duplicates
        setChatsForCache((prevState: any) => {
          const newState = prevState.map((chat: any) => {
            if (chat.roomName === roomName) {
              return {
                ...chat,
                messages: [...chat.messages, ...updatedMessagesForCache]
              };
            }
            return chat;
          });
          return newState;
        });
      }
    };

    socket.on('new_message', handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [openChats, setOpenChats, chatsForCache, setChatsForCache]);
};