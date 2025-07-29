import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

const LegalAidMap: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Legal Aid Map - Legal Youth</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
          Legal Aid Map
        </Typography>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Interactive Map Coming Soon
          </Typography>
          <Typography variant="body1">
            Find legal aid centers in your area with our interactive map.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default LegalAidMap; 