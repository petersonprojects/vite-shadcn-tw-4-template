import React, { useEffect, useState } from 'react';
import { socket } from './socket';

function SocketTest() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [pingCount, setPingCount] = useState(0);
  const [userId, setUserId] = useState('user123');
  const [recipientId, setRecipientId] = useState('recipient456');
  const [messageText, setMessageText] = useState('');
  const [socketInfo, setSocketInfo] = useState({});
  const [globalEvents, setGlobalEvents] = useState([]);
  const [monitoringActive, setMonitoringActive] = useState(false);

  useEffect(() => {
    function onConnect() {
      setConnected(true);
      addMessage('Connected to server');
      
      // Get socket details when connected
      updateSocketInfo();
    }

    function onDisconnect() {
      setConnected(false);
      addMessage('Disconnected from server');
    }

    function onPong(data) {
      addMessage(`Received pong: ${JSON.stringify(data)}`);
    }

    function onTestResponse(data) {
      addMessage(`Received test response: ${JSON.stringify(data)}`);
    }

    function onChatHistory(data) {
      addMessage(`Received chat history: ${JSON.stringify(data)}`);
    }

    function onNewMessage(data) {
      addMessage(`Received new message: ${JSON.stringify(data)}`);
    }

    function onNewNotification(data) {
      addMessage(`Received notification: ${JSON.stringify(data)}`);
    }

    function onOlderMessages(data) {
      addMessage(`Received older messages: ${JSON.stringify(data)}`);
    }

    function onError(error) {
      addMessage(`Socket error: ${error.message || JSON.stringify(error)}`);
    }

    function onConnectError(error) {
      addMessage(`Connection error: ${error.message || JSON.stringify(error)}`);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('pong', onPong);
    socket.on('test_response', onTestResponse);
    socket.on('chat_history', onChatHistory);
    socket.on('new_message', onNewMessage);
    socket.on('new_notification', onNewNotification);
    socket.on('older_messages', onOlderMessages);
    socket.on('error', onError);
    socket.on('connect_error', onConnectError);

    // Check initial connection state
    if (socket.connected) {
      setConnected(true);
      addMessage('Already connected to server');
      updateSocketInfo();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('pong', onPong);
      socket.off('test_response', onTestResponse);
      socket.off('chat_history', onChatHistory);
      socket.off('new_message', onNewMessage);
      socket.off('new_notification', onNewNotification);
      socket.off('older_messages', onOlderMessages);
      socket.off('error', onError);
      socket.off('connect_error', onConnectError);
    };
  }, []);

  // Set up global event monitoring
  useEffect(() => {
    if (!monitoringActive) return;

    // Create a function to intercept console.log calls
    const originalConsoleLog = console.log;
    console.log = function(...args) {
      // Check if this is a socket emit log
      if (args[0] && typeof args[0] === 'string' && args[0].includes('[Socket Emit]')) {
        const timestamp = new Date().toLocaleTimeString();
        const eventInfo = `${timestamp}: ${args[0]} ${JSON.stringify(args[1] || '')}`;
        setGlobalEvents(prev => [eventInfo, ...prev].slice(0, 50)); // Keep last 50 events
      }
      // Call the original console.log
      originalConsoleLog.apply(console, args);
    };

    return () => {
      // Restore original console.log when component unmounts or monitoring is disabled
      console.log = originalConsoleLog;
    };
  }, [monitoringActive]);

  function toggleEventMonitoring() {
    setMonitoringActive(prev => !prev);
    addMessage(`Global event monitoring ${!monitoringActive ? 'started' : 'stopped'}`);
  }

  function clearEventLog() {
    setGlobalEvents([]);
    addMessage('Global event log cleared');
  }

  function updateSocketInfo() {
    // Get information about the socket instance
    const info = {
      id: socket.id,
      connected: socket.connected,
      disconnected: socket.disconnected,
      nsp: socket.nsp,
      auth: socket.auth || {},
      // List all registered event listeners
      registeredEvents: Object.keys(socket._callbacks || {}).map(key => key.replace(/^\$/, ''))
    };
    setSocketInfo(info);
    addMessage(`Socket info updated: ID=${info.id}, Namespace=${info.nsp}`);
  }

  function addMessage(message) {
    setMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  }

  function sendPing() {
    const count = pingCount + 1;
    setPingCount(count);
    socket.emit('ping', { count, timestamp: new Date().toISOString() });
    addMessage(`Sent ping #${count}`);
  }

  function sendTest() {
    socket.emit('test', { message: 'Testing socket connection', timestamp: new Date().toISOString() });
    addMessage('Sent test message');
  }

  function joinRoom() {
    try {
      socket.emit('join_room', [userId, recipientId]);
      addMessage(`Sent join_room event with [${userId}, ${recipientId}]`);
    } catch (error) {
      addMessage(`Error joining room: ${error.message}`);
    }
  }

  function joinNotificationRoom() {
    try {
      socket.emit('join_notification_room', userId);
      addMessage(`Sent join_notification_room event with ${userId}`);
    } catch (error) {
      addMessage(`Error joining notification room: ${error.message}`);
    }
  }

  function sendMessage() {
    if (!messageText.trim()) {
      addMessage('Cannot send empty message');
      return;
    }
    try {
      socket.emit('send_message', [userId, recipientId, messageText]);
      addMessage(`Sent send_message event with [${userId}, ${recipientId}, "${messageText}"]`);
      setMessageText('');
    } catch (error) {
      addMessage(`Error sending message: ${error.message}`);
    }
  }

  function loadPreviousChats() {
    try {
      // Normally you'd track the last message ID, using a placeholder here
      const lastFetchedMessageId = 'last_message_id_placeholder';
      socket.emit('load_prev_chats', [userId, recipientId, lastFetchedMessageId]);
      addMessage(`Sent load_prev_chats event with [${userId}, ${recipientId}, ${lastFetchedMessageId}]`);
    } catch (error) {
      addMessage(`Error loading previous chats: ${error.message}`);
    }
  }

  function leaveRoom() {
    try {
      const roomName = [userId, recipientId].sort().join('_');
      socket.emit('leave', roomName);
      addMessage(`Sent leave event with ${roomName}`);
    } catch (error) {
      addMessage(`Error leaving room: ${error.message}`);
    }
  }

  function connectSocket() {
    try {
      socket.connect();
      addMessage('Attempting to connect...');
    } catch (error) {
      addMessage(`Error connecting: ${error.message}`);
    }
  }

  function disconnectSocket() {
    try {
      socket.disconnect();
      addMessage('Disconnected manually');
    } catch (error) {
      addMessage(`Error disconnecting: ${error.message}`);
    }
  }

  function inspectSocket() {
    updateSocketInfo();
    addMessage('Socket inspection complete - see Socket Info section');
  }

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      color: '#ffffff',
      backgroundColor: '#222222',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
    },
    header: {
      color: '#ffffff',
      borderBottom: '1px solid #444444',
      paddingBottom: '10px',
      marginBottom: '15px'
    },
    statusSection: {
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#333333',
      borderRadius: '5px'
    },
    statusText: {
      color: '#ffffff',
      fontWeight: 'bold'
    },
    buttonRow: {
      marginBottom: '10px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px'
    },
    button: {
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    disabledButton: {
      backgroundColor: '#555555',
      color: '#999999',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'not-allowed'
    },
    chatSection: {
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#333333',
      borderRadius: '5px',
      border: '1px solid #444444'
    },
    inputGroup: {
      marginBottom: '10px',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '10px'
    },
    label: {
      color: '#ffffff',
      minWidth: '80px'
    },
    input: {
      padding: '8px',
      backgroundColor: '#444444',
      color: '#ffffff',
      border: '1px solid #555555',
      borderRadius: '4px',
      flexGrow: 1
    },
    messagesContainer: {
      height: '300px',
      overflowY: 'auto',
      border: '1px solid #444444',
      padding: '10px',
      backgroundColor: '#2a2a2a',
      borderRadius: '4px',
      color: '#e0e0e0'
    },
    messageItem: {
      marginBottom: '5px',
      padding: '5px',
      borderBottom: '1px solid #444444'
    },
    infoSection: {
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#333333',
      borderRadius: '5px',
      border: '1px solid #444444'
    },
    infoItem: {
      marginBottom: '5px',
      display: 'flex',
      flexDirection: 'column'
    },
    infoLabel: {
      color: '#aaaaaa',
      fontSize: '0.9em'
    },
    infoValue: {
      color: '#ffffff',
      wordBreak: 'break-all'
    },
    monitorSection: {
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#333333',
      borderRadius: '5px',
      border: '1px solid #444444'
    },
    monitorHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    },
    monitorStatus: {
      padding: '3px 8px',
      borderRadius: '4px',
      fontSize: '0.8em',
      fontWeight: 'bold'
    },
    activeMonitor: {
      backgroundColor: '#4caf50',
      color: 'white'
    },
    inactiveMonitor: {
      backgroundColor: '#f44336',
      color: 'white'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Socket.IO Connection Test</h2>
      
      <div style={styles.statusSection}>
        <p>Status: <strong style={connected ? {color: '#4caf50'} : {color: '#f44336'}}>
          {connected ? '✅ Connected' : '❌ Disconnected'}
        </strong></p>
        <div style={styles.buttonRow}>
          <button 
            onClick={connectSocket} 
            disabled={connected} 
            style={connected ? styles.disabledButton : styles.button}
          >
            Connect
          </button>
          <button 
            onClick={disconnectSocket} 
            disabled={!connected} 
            style={!connected ? styles.disabledButton : styles.button}
          >
            Disconnect
          </button>
          <button 
            onClick={sendPing} 
            disabled={!connected} 
            style={!connected ? styles.disabledButton : styles.button}
          >
            Send Ping
          </button>
          <button 
            onClick={sendTest} 
            disabled={!connected} 
            style={!connected ? styles.disabledButton : styles.button}
          >
            Send Test
          </button>
          <button 
            onClick={inspectSocket} 
            disabled={!connected} 
            style={!connected ? styles.disabledButton : {...styles.button, backgroundColor: '#ff9800'}}
          >
            Inspect Socket
          </button>
        </div>
      </div>

      <div>
        <h3 style={styles.header}>Messages:</h3>
        <div style={styles.messagesContainer}>
          {messages.map((msg, i) => (
            <div key={i} style={styles.messageItem}>{msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SocketTest;