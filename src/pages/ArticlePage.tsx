import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Chip,
  Link,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ArticlePage: React.FC = () => {
  const { articleId } = useParams();

  return (
    <>
      <Helmet>
        <title>Article {articleId} - Legal Youth</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
          Article {articleId}
        </Typography>
        <Typography variant="body1">
          Article content with professional vocabulary explanations coming soon...
        </Typography>
      </Container>
    </>
  );
};

export default ArticlePage; 