import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { loginSuccess, selectUserLoggedIn } from '../../index';


function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectUserLoggedIn);

  const handleSuccess = async (credentialResponse) => {
    const authorizationCode = credentialResponse.credential;
  
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: authorizationCode }),
      });
  
      const data = await response.json();
      
      console.log(data); // Log to see the response
  
      if (data.success) {

        dispatch(loginSuccess({loggedIn: true, userId: data.userId, accessToken: data.accessToken, username: data.username}));

        if (data.userExists) {
          // Store the JWT tokens in localStorage
          localStorage.setItem('userData', JSON.stringify({
            loggedIn: true,
            userId: data.userId,
            accessToken: data.accessToken,
            username: data.username,
          }));
          localStorage.setItem("accessToken", data.accessToken);
  
          // Redirect to dashboard or home page
          navigate('/dashboard');
        } else {
          // If user doesn't exist, redirect to complete profile page
          navigate('/complete-profile');
        }
      } else {
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error exchanging authorization code:', error);
    }
  };
  

  const handleError = (errorResponse) => {
    console.error('Google login failed', errorResponse);
  };

  return (
    <div className='w-full'>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
      />

    </div>
  );
}

export default SignIn;