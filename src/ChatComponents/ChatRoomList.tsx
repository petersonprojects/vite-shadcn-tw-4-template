/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import "../App.css";
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    useTheme
} from '@mui/material';

import { ChatWindow } from "./ChatWindow";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserId,
  markNotificationsAsRead,
  selectChatList, selectChatStatus, selectChatError,
  setCachedChats, selectCachedChats,
  selectNotifications
} from '../main';

import "./Chat.css";

import { socket } from '../socket';
import { useRealTimeNotifications } from './useRealTimeNotifications.ts';
import { useChatHistory } from './useChatHistory.ts';
import {
  chatRoomListBoxSx,
  expandedBoxSx,
  listItemSx,
  listItemButtonSx,
  listItemTextSx,
  iconButtonSx,
  chatBubbleIconSx,
  chatBubbleTextSx
} from './ChatRoomListStyles'; // Import the styles

import { useHandleNewMessage } from './useHandleNewMessage';
import { useFetchChatList } from './useFetchChatList';
import { useFetchNotifications } from './useFetchNotifications';
import ChatWindowState from '../Interfaces/IChatWindowState.ts';

interface Message {
  id: string;
  message: string;
  userId: string;
  recipientId: string;
}

type MessageThread = Message[];

interface Chat {
  id: string; // Unique identifier for the chat
  firstName: string; // First Name of the chat or participant
  roomName: string; // Room name used for socket communication
  messages: MessageThread; // Array of messages in the chat
  shouldLoadMore: boolean; // Flag to indicate if more messages should be loaded
  isLoadingInitial: boolean; // Flag to indicate if initial loading is happening
  isLoadingPrevious: boolean; // Flag to indicate if previous messages are loading
  scrollPosition: number; // Current scroll position in the chat window
}

export default function ChatRoomList() {

  // theme
  const theme = useTheme();

  // redux
  const dispatch = useDispatch();

  const userId = useSelector(selectUserId);
  const cachedChats = useSelector(selectCachedChats);
  const chatList = useSelector(selectChatList);
  const chatStatus = useSelector(selectChatStatus);
  const chatError = useSelector(selectChatError);
  const notifications = useSelector(selectNotifications);

  // component basic state
  const [isExpanded, setIsExpanded] = useState(false);
  const [openChats, setOpenChats] = useState<Chat[]>([]);
  const [chatsForCache, setChatsForCache] = useState<Chat[]>([]);
  const [realTimeNotifications, setRealTimeNotifications] = useState<Array<any>>([]);
  const [notificationsUnread, setNotificationsUnread] = useState<number>(notifications.filter((notif: any) => !notif.isRead).length);

  // filter notifications for this specific chat and count unread ones
  const getUnreadCountForChat = (chatId: string) => {
    const unreadCount = notifications.filter((notif: any) => notif.senderId === chatId && !notif.isRead).length;
    const realTimeUnreadCount = realTimeNotifications.filter((notif: any) => notif.senderId === chatId && !notif.isRead).length;
    return unreadCount + realTimeUnreadCount;
  };

  // use function above to get the total unread notifications
  const getTotalUnreadCount = (chatList: any): number => {

    let totalUnreadCount = 0;

    chatList.forEach((chat: any) => {
      totalUnreadCount = totalUnreadCount + getUnreadCountForChat(chat.userId);
    });

    return totalUnreadCount;
  }

  // handle expand and collapse of main chat room list
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  // function that handles setting loading previous chats to true
  const setIsLoadingPrevious = (indexRef: number) => {
    setOpenChats((prevState: any) => {
      const newState = [...prevState];
      newState[indexRef] = {
        ...newState[indexRef],
        isLoadingPrevious: true
      };
      return newState;
    });
  }

  // new function for the body of the set state functions
  const getNewStateFromPrevState = (prevState: any, chatObj: any, chatId: string) => {
    const newState = [...prevState];
    const existingChatIndex = newState.findIndex((chat: any) => chat.id === chatId);
    if (existingChatIndex !== -1) {
      newState[existingChatIndex] = { ...chatObj };
    } else {
      newState.unshift({ ...chatObj });
    }
    return newState;
}

  const handleChatClick = (name: string, chatId: string) => {
    // Check if the chatId already exists in openChats
    const isDuplicate = openChats.some((chat: Chat) => chat.id === chatId);
    if (isDuplicate) return; // If the chat is already open, do nothing
  
    // Find the chat in cachedChats
    const chatObj = cachedChats.find((chat: ChatWindowState) => chat.id === chatId);
  
    if (chatObj) {
      // If the chat is cached, update the state
      setOpenChats((prevState: any) => {
        return getNewStateFromPrevState(prevState, chatObj, chatId);
      });
  
      setChatsForCache((prevState: any) => {
        return getNewStateFromPrevState(prevState, chatObj, chatId);
      });

    } else {
      // If the chat is not cached, create a new chat object and join the room
      const newChat = {
        firstName: name,
        id: chatId,
        roomName: [userId, chatId].sort().join('_'),
        messages: [],
        shouldLoadMore: true,
        isLoadingInitial: true,
        isLoadingPrevious: false,
        scrollPosition: 0
      };
  
      setOpenChats([newChat, ...openChats]);
      setChatsForCache([newChat, ...openChats]);
  
      // Join the room passing userId and recipientId(chatId) to form the dynamic roomName
      console.log("joining room: ", userId, chatId)
      socket.emit('join_room', [userId, chatId]);
    }
  
    // Mark notifications from this sender as read
    const unreadCount = getUnreadCountForChat(chatId);
    if (unreadCount > 0) {
      dispatch(markNotificationsAsRead(chatId));
  
      // Update the unread count
      setNotificationsUnread(prev => prev - unreadCount);
  
      // Mark real-time notifications from this sender as read
      setRealTimeNotifications((prevState: any) => {
        return prevState.map((notif: any) => {
          if (notif.senderId === chatId) {
            return { ...notif, isRead: true };
          }
          return notif;
        });
      });
  
      markNotificationsAsReadInDatabase(chatId);
    }
  };

  const markNotificationsAsReadInDatabase = async (senderId: string) => {
    try {
      await fetch(`/api/users/${userId}/notifications/markAsRead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId }),
      });
    } catch (error) {
      console.error('Error marking notifications as read in database:', error);
    }
  };

  // Use the custom hook for real-time notifications
  useRealTimeNotifications(openChats, userId, setRealTimeNotifications, setNotificationsUnread);

    // Use the custom hook for handling new messages
  useHandleNewMessage(openChats, setOpenChats, chatsForCache, setChatsForCache);

    // Use the custom hook for fetching chat list
  useFetchChatList();

    // Use the custom hook for fetching notifications
  useFetchNotifications(notificationsUnread, setNotificationsUnread);

  useChatHistory(openChats, setOpenChats, setChatsForCache);

  useEffect(() => {
    dispatch(setCachedChats(chatsForCache));
  }, [openChats, chatsForCache, dispatch]);

  useEffect(() => {
    console.log("realtimers: ", realTimeNotifications)
  }, [realTimeNotifications]);

  return (
    <div className="parent">
      {openChats.map((chat: Chat, index: number) => {
        return <ChatWindow
          name={chat.firstName}
          key={`chat-window-${chat.id}-${userId}`}
          id={chat.id}
          userId={userId}
          position={index}
          arrayLength={openChats.length}
          onClose={() => {
            const chatsWithClosedChatRemoved = openChats.filter((chatFilt: any) => {
              return chat.id !== chatFilt.id
            });

            setOpenChats(chatsWithClosedChatRemoved);
          }}
          isParentExpanded={isExpanded}
          socket={socket}
          messagesProp={chat.messages}
          isLoadingInitial={chat.isLoadingInitial}
          isLoadingPrevious={chat.isLoadingPrevious}
          setIsLoadingPrevious={setIsLoadingPrevious}
          shouldLoadMore={chat.shouldLoadMore}
        />
      })}

      <Box
        className="fixed-subdiv chatbubbleicon-container"
        sx={chatRoomListBoxSx(theme, isExpanded)}
        onClick={isExpanded ? undefined : handleClick}
      >
        {isExpanded ? (
          <>
            <Box sx={expandedBoxSx(theme)} className="expandedBox">
              <ListItem
                onClick={handleClick}
                sx={listItemSx(theme)}
              >
                <Typography variant="h6">My Chats</Typography>

              </ListItem>

            </Box>

            <Box>
              <List
                sx={{
                  paddingTop: 0

                }}
              >
                {chatStatus === 'loading' && <p>Loading chats...</p>}
                {chatStatus === 'failed' && <p>Error: {chatError}</p>}
                {chatStatus === 'succeeded' &&
                  chatList.map((chat: any) => {

                    const unreadCount = getUnreadCountForChat(chat.userId);

                    return (<ListItemButton
                      key={chat.userId}
                      onClick={() => handleChatClick(chat.firstName, chat.userId)}
                      sx={listItemButtonSx(theme)}
                    >
                      <ListItemText
                        primary={chat.firstName}
                        secondary={`ID: ${chat.userId}`}
                        sx={listItemTextSx()}
                      />

                      {
                        unreadCount > 0 ?
                          <div className="notification-bubble">
                            <span className="notification-number">
                              {
                                unreadCount
                              }
                            </span>
                          </div>
                          : null
                      }

                    </ListItemButton>);
                  })
                }
              </List>
            </Box>
          </>
        ) : (
          <Box>
            <IconButton
              sx={iconButtonSx()}
            >
              <ChatBubbleOutlinedIcon
                sx={chatBubbleIconSx()}
                className="chatbubbleicon"
              />

              <Typography variant="h6"
                sx={chatBubbleTextSx()}
                className="chatbubbletext"
              >
                My Chats
              </Typography>

              {

                getTotalUnreadCount(chatList) > 0 ?
                  <div className="notification-bubble">
                    <span className="notification-number">
                      {

                        getTotalUnreadCount(chatList)
                      }
                    </span>
                  </div>

                  : null
              }

            </IconButton>

          </Box>
        )}
      </Box>

    </div>
  );
}