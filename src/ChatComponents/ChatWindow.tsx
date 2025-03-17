/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatComponent from "./Chat";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { setCachedChats, selectCachedChats } from "../main";
import ChatWindowState from "../Interfaces/IChatWindowState";
// import ChatState from "../Interfaces/IChatState";
import { Socket } from "socket.io-client";

import {
  mainBoxSx,
  headerBoxSx,
  closeIconStyle,
  typographyNameStyle,
  closeIconButtonStyle
} from "./ChatWindowStyles"; // import styles from ChatWindowStyles

interface Message {
  id: string;
  message: string;
  userId: string;
  recipientId: string;
}


type CachedChats = ChatWindowState;

type MessageThread = Message[];

interface ChatWindowProps {
  name: string;
  id: any;
  userId: any;
  position: number;
  onClose: () => void;
  arrayLength: number;
  isParentExpanded: boolean;
  socket: Socket;
  messagesProp: MessageThread;
  isLoadingInitial: boolean;
  isLoadingPrevious: boolean;
  setIsLoadingPrevious: any;
  shouldLoadMore: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  name,
  id,
  userId,
  position,
  arrayLength,
  onClose,
  isParentExpanded,
  socket,
  messagesProp,
  isLoadingInitial,
  isLoadingPrevious,
  setIsLoadingPrevious,
  shouldLoadMore,
}) => {

    type CalculatePositionCallback = (index: number, length: number) => number;

    // calculate a new position for the window depending on parent's expansion
    // as well as how many windows are currently open
    const calculatePosition: CalculatePositionCallback = useCallback((index, length) => {
        const baseValue = 175;
        const additionalValue = 265 * (length - index - 1); 
        const addedWidthFromParentExpand = 125;

        if (isParentExpanded) {
            return baseValue + additionalValue + addedWidthFromParentExpand;
        } else {
            return baseValue + additionalValue;
        }
    }, [isParentExpanded]);

    const updatePosition = useCallback(() => {
        setCalculatedPosition(calculatePosition(position, arrayLength));
    }, [position, arrayLength, calculatePosition]);

    const [calculatedPosition, setCalculatedPosition] = useState<number>(() => calculatePosition(position, arrayLength));
    
    useEffect(updatePosition, [updatePosition]);

    const [isExpanded, setIsExpanded] = useState(true);
    const [hoveredCollapsed, setHoveredCollapse] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);
    const cachedChats = useSelector(selectCachedChats);

    const dispatch = useDispatch();

    // populate the state with cached chats from redux by id
    useEffect(() => {
        if (cachedChats.length !== 0) {
            const chatObj = cachedChats.find(chatObj => chatObj.id === id);
            if (chatObj) {
                const newState = cachedChats.map(chat => chat.id === id ? { ...chatObj } : chat);
                dispatch(setCachedChats(newState));
            }
        }
    }, [messagesProp, dispatch, id]);

    // the main message thread array, comprised of Messages
    const [messages, setMessages] = useState<MessageThread>(messagesProp);


    // update the state when new messages are passed down
    useEffect(() => {
        setMessages(messagesProp);
    }, [messagesProp]);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };
    
    const handleLoadPrevChats = () => {
        setIsLoadingPrevious(position);
        console.log("handleLoadPrevChats being called.");

        if (messages.length < 10) return;

        const chatWindowInQuestion = cachedChats?.find((chatObj: any) => chatObj.id === id);

        if (!chatWindowInQuestion?.shouldLoadMore) return;

        console.log("last message: ", messages[0]);

        const lastMessageId = messages[0].id;
        socket.emit('load_prev_chats', [userId, id, lastMessageId]);
    };

    // assign a new variable the references id, renamed for clarification
    const recipientId = id;

    // make theme available
    const theme = useTheme();

  return (
    <Box
      className="subdiv"
      key={`chat-thread-parent-${recipientId}-${userId}`}
      sx={mainBoxSx(theme, isExpanded, calculatedPosition)}
      onClick={isExpanded ? undefined : handleClick}
      onMouseOver={() => {
        if (isExpanded) {
          setHoveredCollapse(false);
        }

        if (!isExpanded) {
          setHoveredCollapse(true);
        }
      }}
      onMouseLeave={() => {
        if (!isExpanded) {
          setHoveredCollapse(false);
        }
      }}
    >
      {/* Header */}
      <Box
        sx={headerBoxSx(hovered, theme)}
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        className="chat-header"
      >
        <Typography variant="h6" sx={typographyNameStyle()}>
          {name}
        </Typography>
        <Typography variant="body2" noWrap>
          {recipientId}
        </Typography>

        <IconButton
          onClick={onClose}
          style={closeIconButtonStyle(hoveredCollapsed)}
        >
          <CloseIcon sx={closeIconStyle(hovered)} />
        </IconButton>
      </Box>

      {isExpanded ? (
        <ChatComponent
          key={`chat-thread-${recipientId}-${userId}`}
          id={recipientId}
          userId={userId}
          messages={messages}
          isLoadingPrevious={isLoadingPrevious}
          setIsLoadingPrevious={setIsLoadingPrevious}
          isLoadingInitial={isLoadingInitial}
          handleLoadPrevChats={handleLoadPrevChats}
          recipientId={id}
          socket={socket}
          isExpanded={isExpanded}
          cachedChats={cachedChats}
        />
      ) : null}
    </Box>
  );
};