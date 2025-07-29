import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

const Profile: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Profile - Legal Youth</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
          User Profile
        </Typography>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Profile & Gamification Coming Soon
          </Typography>
          <Typography variant="body1">
            Track your progress, earn titles, and manage your account.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default Profile; 