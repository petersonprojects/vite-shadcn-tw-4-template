/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useRef, useCallback } from 'react';

import "../App.css";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import { withStyles } from '@mui/styles';
import useInputValidation from './useInputValidation';
import { Socket } from 'socket.io-client';


interface Message {
    id: string;
    message: string;
    userId: string;
    recipientId: string;
}
  
type MessageThread = Message[];

interface ChatProps {
  id: string;
  userId: string;
  messages: MessageThread;
  isLoadingPrevious: boolean;
  setIsLoadingPrevious: (loading: boolean) => void;
  isLoadingInitial: boolean;
  handleLoadPrevChats: () => void;
  recipientId: string;
  socket: Socket;
  isExpanded: boolean;
  cachedChats: any; // Please provide the type definition for CachedChat
}

const CssTextField = withStyles({
    root: {
      padding: "0",
      '& label.Mui-focused': {
        color: "rgb(0, 122, 255)",
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: "rgb(10, 132, 230)",
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: "rgb(10, 132, 230)",
        },
      }
    }
  })(TextField);

const ChatComponent: React.FC<ChatProps>  = ({ id, userId, messages, isLoadingPrevious, isLoadingInitial, setIsLoadingPrevious, handleLoadPrevChats, socket, isExpanded, cachedChats }) => {

    const threadRef:any = useRef(null); // For scrolling

    // this is actually just what is in the input text area
    // const [message, setMessage] = useState<string>('');
    const { value, setValue, errors, validate } = useInputValidation('');
    const [showErrors, setShowErrors] = useState(false);

    const sendSocketMessage = (userId:string, recipientId:string, message:string) => {
        socket.emit('send_message', [userId, recipientId, message]);
    };

    // Emit the message to the server
    const sendMessage = (event: any) => {
        event.preventDefault();
        setShowErrors(true);
        // only send if valid
        if (validate(value)) {
          sendSocketMessage(userId, id, value);
          
          // clear text area after message is sent
          setValue('');
        }

    };


    const messageThread:any = useRef(null);

    useEffect(() => {

        const div:any = messageThread.current;
  
        //
        const chatWindowInQuestion = cachedChats?.find((chatObj:any) => chatObj.id === id);
  
        const handleScroll = () => {
  
          if (div?.scrollTop === 0 && chatWindowInQuestion?.shouldLoadMore) { // Check if scrolled to top
            console.log("chat window shouldLoadMore and scrolled top")
            handleLoadPrevChats();
          }
        };
      
        div?.addEventListener('scroll', handleScroll);
      
        return () => {
          div?.removeEventListener('scroll', handleScroll);
        };
  
      });


      // working new

      const scrollToBottom: () => void = useCallback((): void => {

        if (threadRef.current && !isLoadingPrevious) {

          threadRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });

        }

      }, [threadRef, isLoadingPrevious]);
       
      useEffect(() => {

        scrollToBottom();
        
      }, [messages, scrollToBottom]);

      useEffect(() => {

        console.log("messages: ", messages)
        
      }, [messages]);


    return (

<div className={"message-thread-parent"} key={`message-thread-parent-${id}-${userId}`} >


<Box sx={{
                width: "100%",
                height: 290,
                maxHeight: 400,
                overflowY:"scroll",
                padding: 0
             }}
             className="chat-body"
             id={`chat-thread-container-${id}-${userId}`}
             key={`chat-thread-container-${id}-${userId}`}
             ref={messageThread}
         > 


<div 
    className={"message-thread"} 
    id={`message-thread-${id}-${userId}`}
    key={`message-thread-${id}-${userId}`} 

>

    {messages.length === 0 && !isLoadingInitial ?  "No message history with this user" : null}

    {messages.length > 0 ? messages.map((message: any) => (


<React.Fragment key={`sent-and-received-${message.userId}-${message.recipientId}-${message.id}`}>

        {message.recipientId === userId && message.userId === userId ? (
        // MESSAGE WITH SELF
<>
            <div
                className={`message sent ${message.userId}-${message.recipientId}`}
                key={`message-sent-${message.userId}-${message.recipientId}-${message.id}`}
            >
                <p>{message.message}</p>
            </div>
            <div
                className={`message received ${message.userId}-${message.recipientId}`}
                key={`message-received-${message.userId}-${message.recipientId}-${message.id}`}
            >
                <p>{message.message}</p>
            </div>
            
</>

        ) : (
        // Render as either sent or received based on original logic

            <div
                className={`message ${message.userId === userId ? 'sent' : 'received'}`}
                key={`message-${message.userId}-${message.recipientId}-${message.id}`}
            >
                <p>{message.message}</p>
            </div>

        )}

</React.Fragment>
    )) 
    : isLoadingInitial ? <Box sx={{ display: 'flex', justifyContent:"center", padding: "20px"}}>
        <CircularProgress />
    </Box>
    : null
    }

      {errors.isEmpty && <p>Message cannot be empty</p>}
      {errors.isTooLong && <p>Message is too long</p>}
      {errors.containsProfanity && <p>Message contains profanity</p>}
</div>

{/* this is used to scroll to the end of the chat */}
<div ref={threadRef}></div>


</Box>


            <form
                id={`form-chat-${id}-${userId}`}
                className='message-input'
            >
                 {/* <Box 
                 >  */}

                    <CssTextField 
                    id={`text-area-${id}-${userId}`} 
                    label="message"
                    variant="outlined"
                    autoComplete="off"
                    type="text"
                    fullWidth={true}
                    multiline
                    maxRows={1}
                    value={value}
                    onChange={(e:any) => setValue(e.target.value)} 
                    sx={{
                        width:"100%",
                         color: "rgb(0, 122, 255)"
                    }}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment 
                            position="end"
                            sx={{ 
                                width: '20px',
                                height: '20px'
                             }}
                            >
                            <IconButton
                              color="primary"
                              aria-label="send message"
                              onClick={sendMessage}
                              sx={{
                                padding:"3px",
                                color: "rgb(0, 122, 255)"
                            }}
                            >
                              <SendIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                            alignItems:"flex-end",
                        },
                    }}
                />

            {/* </Box> */}
            </form>

</div>

    );
};

export default ChatComponent;
