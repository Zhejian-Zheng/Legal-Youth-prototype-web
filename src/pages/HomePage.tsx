import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Paper,
  TextField,
  InputAdornment,
  Avatar,
  Badge,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  Chat as ChatIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Home as HomeIcon,
  ShoppingCart as ShoppingIcon,
  FamilyRestroom as FamilyIcon,
  Security as SecurityIcon,
  Accessibility as AccessibilityIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    {
      id: 'employment',
      title: 'Employment',
      icon: <WorkIcon />,
      description: 'Workplace rights, contracts, and discrimination',
      color: '#1976d2',
      articleCount: 45,
    },
    {
      id: 'housing',
      title: 'Housing',
      icon: <HomeIcon />,
      description: 'Tenant rights, eviction, and housing discrimination',
      color: '#2e7d32',
      articleCount: 32,
    },
    {
      id: 'family',
      title: 'Family Law',
      icon: <FamilyIcon />,
      description: 'Divorce, custody, and family matters',
      color: '#ed6c02',
      articleCount: 28,
    },
    {
      id: 'consumer',
      title: 'Consumer Rights',
      icon: <ShoppingIcon />,
      description: 'Contracts, scams, and consumer protection',
      color: '#9c27b0',
      articleCount: 38,
    },
    {
      id: 'education',
      title: 'Education',
      icon: <SchoolIcon />,
      description: 'Student rights, discipline, and special education',
      color: '#d32f2f',
      articleCount: 25,
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: <SecurityIcon />,
      description: 'Digital rights, privacy, and online safety',
      color: '#7b1fa2',
      articleCount: 22,
    },
  ];

  const popularArticles = [
    {
      id: '1',
      title: 'Understanding Your Rights as a Tenant',
      excerpt: 'Learn about your rights when renting, including what landlords can and cannot do.',
      category: 'Housing',
      readTime: '5 min read',
      views: 1247,
      image: '/api/placeholder/300/200',
    },
    {
      id: '2',
      title: 'What to Do If You\'re Fired Without Notice',
      excerpt: 'Your step-by-step guide to handling wrongful termination and seeking justice.',
      category: 'Employment',
      readTime: '8 min read',
      views: 892,
      image: '/api/placeholder/300/200',
    },
    {
      id: '3',
      title: 'Student Loan Rights and Protections',
      excerpt: 'Understanding your rights when dealing with student loans and debt collectors.',
      category: 'Education',
      readTime: '6 min read',
      views: 756,
      image: '/api/placeholder/300/200',
    },
  ];

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const handleChatSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (chatMessage.trim()) {
      // Handle chat message
      console.log('Chat message:', chatMessage);
      setChatMessage('');
    }
  };

  return (
    <>
      <Helmet>
        <title>Legal Youth - Your Legal Resource Hub</title>
        <meta name="description" content="Comprehensive legal resources and guidance for young people. Find information on employment, housing, family law, consumer rights, and more." />
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography variant="h2" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Your Legal Rights,
                  <br />
                  <Box component="span" sx={{ color: 'yellow.300' }}>
                    Simplified
                  </Box>
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  Get the legal information you need, when you need it. 
                  Free resources, tools, and guidance for young people.
                </Typography>
                
                {/* Search Bar */}
                <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    placeholder="Search for legal topics, articles, or resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    variant="outlined"
                    size="large"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: 'white',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                      },
                    }}
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/tools')}
                    sx={{
                      backgroundColor: 'white',
                      color: 'primary.main',
                      '&:hover': { backgroundColor: 'grey.100' },
                    }}
                  >
                    Interactive Tools
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/resources')}
                    sx={{ borderColor: 'white', color: 'white' }}
                  >
                    Resource Library
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 400,
                  }}
                >
                  <AccessibilityIcon sx={{ fontSize: 200, opacity: 0.3 }} />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                500+
              </Typography>
              <Typography variant="h6">Legal Articles</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                50+
              </Typography>
              <Typography variant="h6">Interactive Tools</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                24/7
              </Typography>
              <Typography variant="h6">Legal Support</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Categories Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
            Explore Legal Topics
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      },
                    }}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: category.color,
                            fontSize: '2rem',
                          }}
                        >
                          {category.icon}
                        </Avatar>
                      </Box>
                      <Typography variant="h5" component="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
                        {category.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {category.description}
                      </Typography>
                      <Chip
                        label={`${category.articleCount} articles`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Popular Articles Section */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <TrendingIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h3" component="h2">
              Popular Articles
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {popularArticles.map((article, index) => (
              <Grid item xs={12} md={4} key={article.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                    }}
                    onClick={() => navigate(`/article/${article.id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={article.image}
                      alt={article.title}
                    />
                    <CardContent>
                      <Chip
                        label={article.category}
                        size="small"
                        color="primary"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {article.excerpt}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          {article.readTime}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {article.views} views
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* AI Chatbot */}
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
          <Tooltip title="Ask our AI Legal Assistant">
            <IconButton
              onClick={() => setIsChatOpen(!isChatOpen)}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                width: 60,
                height: 60,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              <ChatIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {isChatOpen && (
          <Paper
            sx={{
              position: 'fixed',
              bottom: 90,
              right: 20,
              width: 350,
              height: 500,
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
              <Typography variant="h6">AI Legal Assistant</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, p: 2, overflow: 'auto' }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Hi! I'm here to help with your legal questions. What can I assist you with today?
              </Alert>
            </Box>
            <Box component="form" onSubmit={handleChatSubmit} sx={{ p: 2 }}>
              <TextField
                fullWidth
                placeholder="Type your legal question..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" size="small">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
        )}
      </Container>
    </>
  );
};

export default HomePage; 