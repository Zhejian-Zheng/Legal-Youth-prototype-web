import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Forum as ForumIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Person as PersonIcon,
  TrendingUp as TrendingIcon,
  NewReleases as NewIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  ThumbUp as LikeIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Forum {
  id: string;
  title: string;
  description: string;
  category: string;
  memberCount: number;
  topicCount: number;
  postCount: number;
  lastActivity: string;
  isActive: boolean;
  tags: string[];
  moderators: string[];
  image?: string;
}

interface Topic {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  likes: number;
  lastPost: string;
  isPinned: boolean;
  isLocked: boolean;
}

const UserForums: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const forums: Forum[] = [
    {
      id: '1',
      title: 'Employment Rights & Workplace Issues',
      description: 'Discuss workplace rights, discrimination, harassment, and employment law questions.',
      category: 'Employment',
      memberCount: 1247,
      topicCount: 89,
      postCount: 1243,
      lastActivity: '2 hours ago',
      isActive: true,
      tags: ['employment', 'workplace', 'rights'],
      moderators: ['Sarah Johnson', 'Mike Chen'],
    },
    {
      id: '2',
      title: 'Housing & Tenant Rights',
      description: 'Get help with housing issues, eviction defense, and tenant rights.',
      category: 'Housing',
      memberCount: 892,
      topicCount: 156,
      postCount: 2103,
      lastActivity: '1 day ago',
      isActive: true,
      tags: ['housing', 'tenant', 'eviction'],
      moderators: ['Alex Rodriguez', 'Emma Wilson'],
    },
    {
      id: '3',
      title: 'Education Rights & School Issues',
      description: 'Discuss educational rights, IEPs, school discipline, and academic accommodations.',
      category: 'Education',
      memberCount: 1567,
      topicCount: 203,
      postCount: 3456,
      lastActivity: '3 hours ago',
      isActive: true,
      tags: ['education', 'IEP', 'school'],
      moderators: ['Dr. Lisa Park', 'James Thompson'],
    },
    {
      id: '4',
      title: 'Criminal Justice & Police Interaction',
      description: 'Know your rights when dealing with law enforcement and the criminal justice system.',
      category: 'Criminal Justice',
      memberCount: 2341,
      topicCount: 312,
      postCount: 5678,
      lastActivity: '5 hours ago',
      isActive: true,
      tags: ['criminal', 'police', 'rights'],
      moderators: ['Marcus Davis', 'Jennifer Lee'],
    },
    {
      id: '5',
      title: 'Healthcare & Medical Rights',
      description: 'Discuss healthcare access, medical privacy, and patient rights.',
      category: 'Healthcare',
      memberCount: 678,
      topicCount: 45,
      postCount: 789,
      lastActivity: '1 week ago',
      isActive: true,
      tags: ['healthcare', 'medical', 'privacy'],
      moderators: ['Dr. Sarah Kim', 'Robert Martinez'],
    },
    {
      id: '6',
      title: 'LGBTQ+ Rights & Support',
      description: 'Safe space for LGBTQ+ youth to discuss rights, discrimination, and resources.',
      category: 'LGBTQ+ Rights',
      memberCount: 1892,
      topicCount: 267,
      postCount: 4231,
      lastActivity: '4 hours ago',
      isActive: true,
      tags: ['LGBTQ+', 'discrimination', 'support'],
      moderators: ['Taylor Smith', 'Jordan Brown'],
    },
    {
      id: '7',
      title: 'Immigration & DACA Support',
      description: 'Resources and support for immigrant youth and DACA recipients.',
      category: 'Immigration',
      memberCount: 1456,
      topicCount: 178,
      postCount: 2987,
      lastActivity: '6 hours ago',
      isActive: true,
      tags: ['immigration', 'DACA', 'support'],
      moderators: ['Maria Garcia', 'David Kim'],
    },
    {
      id: '8',
      title: 'Digital Privacy & Online Safety',
      description: 'Discuss online privacy, social media rights, and digital safety.',
      category: 'Digital Rights',
      memberCount: 1123,
      topicCount: 134,
      postCount: 2156,
      lastActivity: '1 day ago',
      isActive: true,
      tags: ['digital', 'privacy', 'online'],
      moderators: ['Chris Johnson', 'Amanda White'],
    },
  ];

  const sampleTopics: Topic[] = [
    {
      id: '1',
      title: 'How to file a complaint against my employer?',
      author: 'JohnDoe123',
      replies: 15,
      views: 234,
      likes: 8,
      lastPost: '2 hours ago',
      isPinned: true,
      isLocked: false,
    },
    {
      id: '2',
      title: 'Discrimination at school - what are my rights?',
      author: 'StudentRights',
      replies: 23,
      views: 456,
      likes: 12,
      lastPost: '4 hours ago',
      isPinned: false,
      isLocked: false,
    },
    {
      id: '3',
      title: 'Eviction notice received - need urgent help',
      author: 'HousingHelp',
      replies: 8,
      views: 123,
      likes: 5,
      lastPost: '1 day ago',
      isPinned: false,
      isLocked: false,
    },
  ];

  const categories = ['all', ...Array.from(new Set(forums.map(f => f.category)))];

  const filteredForums = forums.filter(forum => {
    const matchesSearch = forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         forum.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         forum.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || forum.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleForumClick = (forum: Forum) => {
    setSelectedForum(forum);
    setDialogOpen(true);
  };

  const handleJoinForum = (forumId: string) => {
    console.log(`Joining forum: ${forumId}`);
    setDialogOpen(false);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            User Forums
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Connect with others and discuss legal topics in our community forums
          </Typography>
        </Box>

        {/* Search and Filter Controls */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search forums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Forum Grid */}
        <Grid container spacing={3}>
          {filteredForums.map((forum) => (
            <Grid item xs={12} md={6} key={forum.id}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                  onClick={() => handleForumClick(forum)}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <ForumIcon />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {forum.title}
                        </Typography>
                        <Chip 
                          label={forum.category} 
                          size="small" 
                          color="primary" 
                          variant="outlined" 
                          sx={{ mb: 1 }}
                        />
                        {forum.isActive && (
                          <Chip 
                            icon={<TrendingIcon />}
                            label="Active" 
                            size="small" 
                            color="success" 
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {forum.description}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      {forum.tags.slice(0, 3).map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" />
                      ))}
                      {forum.tags.length > 3 && (
                        <Chip label={`+${forum.tags.length - 3} more`} size="small" />
                      )}
                    </Box>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" color="primary">
                            {formatNumber(forum.memberCount)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Members
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" color="primary">
                            {formatNumber(forum.topicCount)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Topics
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" color="primary">
                            {formatNumber(forum.postCount)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Posts
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MessageIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Last activity: {forum.lastActivity}
                      </Typography>
                    </Box>
                  </CardContent>
                  
                  <CardActions>
                    <Button 
                      startIcon={<GroupIcon />}
                      variant="outlined" 
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinForum(forum.id);
                      }}
                    >
                      Join Forum
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {filteredForums.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <ForumIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No forums found matching your criteria
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </Box>
        )}
      </motion.div>

      {/* Forum Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedForum && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">{selectedForum.title}</Typography>
                <IconButton onClick={() => setDialogOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedForum.description}
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {formatNumber(selectedForum.memberCount)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Members
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {formatNumber(selectedForum.topicCount)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Topics
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {formatNumber(selectedForum.postCount)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Posts
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {selectedForum.isActive ? 'Active' : 'Inactive'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Moderators
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedForum.moderators.map((moderator) => (
                    <Chip 
                      key={moderator} 
                      label={moderator} 
                      size="small" 
                      color="secondary"
                      avatar={<Avatar sx={{ width: 20, height: 20 }}><PersonIcon /></Avatar>}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Recent Topics
                </Typography>
                <List>
                  {sampleTopics.map((topic, index) => (
                    <React.Fragment key={topic.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: topic.isPinned ? 'warning.main' : 'grey.300' }}>
                            {topic.isPinned ? <NewIcon /> : <MessageIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body1">
                                {topic.title}
                              </Typography>
                              {topic.isPinned && (
                                <Chip label="Pinned" size="small" color="warning" />
                              )}
                              {topic.isLocked && (
                                <Chip label="Locked" size="small" color="error" />
                              )}
                            </Box>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography variant="caption">
                                by {topic.author}
                              </Typography>
                              <Typography variant="caption">
                                {topic.replies} replies
                              </Typography>
                              <Typography variant="caption">
                                {topic.views} views
                              </Typography>
                              <Typography variant="caption">
                                {topic.likes} likes
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < sampleTopics.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button 
                variant="contained" 
                startIcon={<GroupIcon />}
                onClick={() => handleJoinForum(selectedForum.id)}
              >
                Join Forum
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default UserForums; 