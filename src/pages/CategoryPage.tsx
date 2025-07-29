import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Chip,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams();

  return (
    <>
      <Helmet>
        <title>{categoryId} - Legal Youth</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
          {categoryId} Resources
        </Typography>
        <Typography variant="body1">
          Content for {categoryId} category coming soon...
        </Typography>
      </Container>
    </>
  );
};

export default CategoryPage; 