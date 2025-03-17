import React, { useState } from 'react';

const MarkNotificationsRead = ({ senderId, userId }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleMarkAsRead = async () => {
    setLoading(true);
    setMessage('');

    try {
      // Constructing the request URL
      const url = `/api/bulk-set-notifications-read/${senderId}/${userId}`;

      // Sending POST request using fetch
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Parse the response body as JSON
      const data = await response.json();

      // Handle different response statuses
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || data.message);
      }
    } catch (error) {
      // Handle error
      setMessage(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Mark Notifications as Read</h3>
      <button onClick={handleMarkAsRead} disabled={loading}>
        {loading ? 'Marking as Read...' : 'Mark All as Read'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MarkNotificationsRead;