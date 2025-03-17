/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";

import { Provider } from 'react-redux';
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './theme/customTheme.ts';

import NotificationState from "./Interfaces/INotificationsState";
import UserState from "./Interfaces/IUserState";
import RootState from "./Interfaces/IRootState";
import ChatState from "./Interfaces/IChatState";
import ChatWindowState from "./Interfaces/IChatWindowState";

type CachedChats = ChatWindowState[];

// Initial state for user slice
const initialStateUser = {
    loggedIn: false,
    userId: "",
    accessToken: "",
    username: "",
    role: -1
} as UserState;

// Initial state for notifications slice
const initialStateNotifications = {
  notifications: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
} as NotificationState;

// Initial state for cached chats
const initialChatWindowState = [] as CachedChats;

// Initial state for chat list slice
const initialStateChatList = {
  chatList: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  cachedChats: initialChatWindowState
} as ChatState;

// User slice for Redux Toolkit
const userSlice = createSlice({
    name: "user",
    initialState: initialStateUser,
    reducers: {
        /**
         * Handles successful login by updating the user state.
         * @param {UserState} state - The current state.
         * @param {PayloadAction<UserState>} action - The action payload containing user details.
         */
        loginSuccess: (state, action: PayloadAction<UserState>) => {
            state.loggedIn = true;
            state.userId = action.payload.userId;
            state.accessToken = action.payload.accessToken;
            state.username = action.payload.username;
            state.role = action.payload.role;
        },
        /**
         * Handles user logout by resetting the user state.
         * @param {UserState} state - The current state.
         */
        logout: (state) => {
            state.loggedIn = false;
            state.userId = "";
            state.accessToken = "";
            state.username = "";
            state.role = -1;
        }
    }


});

export const { loginSuccess, logout } = userSlice.actions;

export const selectUserId = (state: RootState) => state.user.userId;
export const selectUserLoggedIn = (state: RootState) => state.user.loggedIn;
export const selectUserRole = (state: RootState) => state.user.role;
export const selectAccessToken = (state: RootState) => state.user.accessToken;

// Notifications slice for Redux Toolkit
const notifications = createSlice({
  name: "notifications",
  initialState: initialStateNotifications,
  reducers: {
    /**
     * Sets the notifications state with the provided notifications.
     * @param {NotificationState} state - The current state.
     * @param {PayloadAction<NotificationState[]>} action - The action payload containing notifications.
     */
    setNotifications(state, action) {
        state.status = 'succeeded';
        state.notifications = action.payload;
    },
    /**
     * Sets the notifications fetch status to loading.
     * @param {NotificationState} state - The current state.
     */
    setNotificationsFetchLoading(state) {
        state.status = 'loading';
        state.error = null;
    },
    /**
     * Sets the notifications fetch status to failed with an error message.
     * @param {NotificationState} state - The current state.
     * @param {PayloadAction<string>} action - The action payload containing the error message.
     */
    setNotificationsFetchError(state, action) {
        state.status = 'failed';
        state.error = action.payload;
    },
    /**
     * Clears the notifications state.
     * @param {NotificationState} state - The current state.
     */
    setClearNotifications(state){
        state.status = "idle";
        state.error = null;
        state.notifications = []
    },
    /**
     * Marks notifications from a specific sender as read.
     * @param {NotificationState} state - The current state.
     * @param {PayloadAction<string>} action - The action payload containing the sender ID.
     */
    markNotificationsAsRead(state, action) {
        const senderId = action.payload;
        state.notifications = state.notifications.map((notification: any) =>
            notification.senderId === senderId ? { ...notification, isRead: true } : notification
        );
    }
  }
});

export const selectNotifications = (state: RootState) => state.notifications.notifications;
export const selectNotificationsFetchLoading = (state: RootState) => state.notifications.status;
export const selectNotificationsFetchError = (state: RootState) => state.notifications.error;

export const { setNotifications, setNotificationsFetchLoading, setNotificationsFetchError, setClearNotifications, markNotificationsAsRead } = notifications.actions;

// Chat slice for Redux Toolkit
const chat = createSlice({
  name: "chat",
  initialState: initialStateChatList,
  reducers: {
    /**
     * Sets the cached chats state with the provided cached chats.
     * @param {ChatState} state - The current state.
     * @param {PayloadAction<CachedChats>} action - The action payload containing cached chats.
     */
    setCachedChats(state, action) {
      state.cachedChats = action.payload;
    },
    /**
     * Sets the chat list state with the provided chat list.
     * @param {ChatState} state - The current state.
     * @param {PayloadAction<ChatState['chatList']>} action - The action payload containing the chat list.
     */
    setChatList(state, action) {
      state.status = 'succeeded';
      state.chatList = action.payload;
    },
    /**
     * Sets the chat fetch status to loading.
     * @param {ChatState} state - The current state.
     */
    setChatFetchLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
    /**
     * Sets the chat fetch status to failed with an error message.
     * @param {ChatState} state - The current state.
     * @param {PayloadAction<string>} action - The action payload containing the error message.
     */
    setChatFetchError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    /**
     * Clears the chat list state.
     * @param {ChatState} state - The current state.
     */
    setClearChatList(state){
      state.status = "idle";
      state.error = null;
      state.chatList = []
    }
  }
});

export const { setChatList, setChatFetchLoading, setChatFetchError, setCachedChats, setClearChatList } = chat.actions;

export const selectChatList = (state: RootState) => state.chat.chatList;
export const selectChatStatus = (state: RootState) => state.chat.status;
export const selectChatError = (state: RootState) => state.chat.error;
export const selectCachedChats = (state: RootState) => state.chat.cachedChats;

// Configure the Redux store
const store = configureStore({
    reducer: {
      user: userSlice.reducer,
      notifications: notifications.reducer,
      chat: chat.reducer
    }
});

// Commented out: Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
 <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
    </Provider>
 </React.StrictMode>
);