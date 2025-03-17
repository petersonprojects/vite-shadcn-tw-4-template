/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {useState} from "react";
import Button from "@mui/material/Button";

import Tooltip from '@mui/material/Tooltip';
//const sendVerificationEmail = require('../../../../server/tokenSender');

interface VerifyEmailProps {
    userEmail: string;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({userEmail}) => {

    const [message, setMessage] = useState<string>("Default Message")

    const handleVerifyEmail = async () => {
        console.log("in verify email")
        try {
            const response = await fetch('/v1/api/send-verification-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ verificationEmail: userEmail }),
            });
            if (response.ok) {
                setMessage('Verification email sent successfully');
                alert('Verification email sent successfully')
            } else {
                setMessage('Error sending verification email');
                alert('Error sending verification email')
            }
        } catch (error) {
            setMessage('Error in fetch post request /v1/api/send-verification-email');
            alert('Error in fetch post request /v1/api/send-verification-email')
        }
    };

  return (
    <div>
        <div>
            You cannot view this page because you have not verified your
            email.
        </div>

        <Tooltip
            title={`Send to: ${userEmail}`}
            placement='right'
        >
            <Button variant="contained" onClick={handleVerifyEmail}>
                Send Verification Email
            </Button>

        </Tooltip>

        <div>

        </div>
    </div>
  );
};

export default VerifyEmail;
