import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

const Forum: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Community Forum - Legal Youth</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
          Community Forum
        </Typography>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Community Forum Coming Soon
          </Typography>
          <Typography variant="body1">
            Connect with others, ask questions, and share experiences in our community forum.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default Forum; 