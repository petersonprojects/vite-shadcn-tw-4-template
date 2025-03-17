// src/components/ErrorPage.tsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
            p={3}
            sx={{
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
        >
            <Typography variant="h1" color="error" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                Oops! The page you're looking for doesn't exist.
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                You may have mistyped the address or the page may have moved.
            </Typography>
            <Link href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} sx={{ mt: 2, fontSize: '1.2rem' }}>
                I wanna go home 😔
            </Link>
        </Box>
    );
};

export default ErrorPage;