import { socket } from '../../socket';
import { useEffect } from 'react';

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected');
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected');
    });
  
    socket.on('error', (error) => {
      console.log('Error:', error);
    });
  
    socket.on('reconnect', (attempt) => {
      console.log('Reconnected on attempt:', attempt);
    });
  
    socket.on('reconnect_attempt', () => {
      console.log('Reconnection attempt');
    });
  
    socket.on('reconnect_error', (error) => {
      console.log('Reconnection error:', error);
    });
  
    socket.on('reconnect_failed', () => {
      console.log('Reconnection failed');
    });
  
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('error');
      socket.off('reconnect');
      socket.off('reconnect_attempt');
      socket.off('reconnect_error');
      socket.off('reconnect_failed');
    };
  }, []);

  return (
    <>
    </>
  );
} 