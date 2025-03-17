import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CompleteProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [additionalInfo, setAdditionalInfo] = useState({}); // Add fields as necessary


  const handleSubmit = async (event) => {
    event.preventDefault();

  };

  return (
    <div>
      <h1>Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for additional info */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CompleteProfile;