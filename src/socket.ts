import { io } from 'socket.io-client';

// Determine the socket URL based on environment
let URL = ''; // Empty string means the URL will be computed from window.location

// For development environments, use localhost:4000
if (process.env.NODE_ENV !== 'production') {
  URL = 'http://localhost:4000';
}

// Initialize the socket connection
export const socket = io(URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 10000,
  withCredentials: true,
  transports: ['websocket', 'polling'],
  path: '/socket.io/' // Ensure the path matches your server configuration
});

// Simple connection status logging
socket.on('connect', () => {
  console.log('Socket connected with ID:', socket.id);
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error.message);
});

socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
});

// Test function to verify socket connection
export const testSocketConnection = () => {
  if (socket.connected) {
    console.log('Socket is connected with ID:', socket.id);
    socket.emit('ping', { message: 'Test ping from client' });
    return true;
  } else {
    console.warn('Socket is not connected. Attempting to reconnect...');
    socket.connect();
    return false;
  }
}; 