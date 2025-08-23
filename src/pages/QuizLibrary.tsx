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
  Rating,
  Avatar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Quiz as QuizIcon,
  School as SchoolIcon,
  Timer as TimerIcon,
  Star as StarIcon,
  PlayArrow as PlayIcon,
  Info as InfoIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: number; // in minutes
  questionCount: number;
  rating: number;
  completionRate: number;
  tags: string[];
  image?: string;
}

const QuizLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const quizzes: Quiz[] = [
    {
      id: '1',
      title: 'Know Your Rights: Employment Law',
      description: 'Test your knowledge about workplace rights, minimum wage, overtime, and discrimination laws.',
      category: 'Employment',
      difficulty: 'Beginner',
      estimatedTime: 15,
      questionCount: 20,
      rating: 4.5,
      completionRate: 85,
      tags: ['employment', 'rights', 'workplace'],
    },
    {
      id: '2',
      title: 'Housing Rights & Tenant Law',
      description: 'Learn about your rights as a tenant, eviction procedures, and housing discrimination.',
      category: 'Housing',
      difficulty: 'Intermediate',
      estimatedTime: 20,
      questionCount: 25,
      rating: 4.2,
      completionRate: 72,
      tags: ['housing', 'tenant', 'eviction'],
    },
    {
      id: '3',
      title: 'Criminal Justice System',
      description: 'Understand your rights when interacting with law enforcement and the criminal justice system.',
      category: 'Criminal Justice',
      difficulty: 'Advanced',
      estimatedTime: 25,
      questionCount: 30,
      rating: 4.8,
      completionRate: 68,
      tags: ['criminal', 'police', 'rights'],
    },
    {
      id: '4',
      title: 'Education Rights & Special Needs',
      description: 'Know your educational rights, IEPs, accommodations, and discrimination in schools.',
      category: 'Education',
      difficulty: 'Intermediate',
      estimatedTime: 18,
      questionCount: 22,
      rating: 4.3,
      completionRate: 78,
      tags: ['education', 'IEP', 'accommodations'],
    },
    {
      id: '5',
      title: 'Healthcare & Medical Rights',
      description: 'Understand your healthcare rights, consent, privacy, and access to medical care.',
      category: 'Healthcare',
      difficulty: 'Beginner',
      estimatedTime: 12,
      questionCount: 18,
      rating: 4.1,
      completionRate: 81,
      tags: ['healthcare', 'medical', 'privacy'],
    },
    {
      id: '6',
      title: 'Digital Privacy & Online Rights',
      description: 'Learn about your digital rights, social media privacy, and online harassment.',
      category: 'Digital Rights',
      difficulty: 'Intermediate',
      estimatedTime: 16,
      questionCount: 20,
      rating: 4.4,
      completionRate: 75,
      tags: ['digital', 'privacy', 'online'],
    },
    {
      id: '7',
      title: 'Immigration Rights & DACA',
      description: 'Understand immigration rights, DACA, and resources for immigrant youth.',
      category: 'Immigration',
      difficulty: 'Advanced',
      estimatedTime: 22,
      questionCount: 28,
      rating: 4.6,
      completionRate: 65,
      tags: ['immigration', 'DACA', 'rights'],
    },
    {
      id: '8',
      title: 'LGBTQ+ Rights & Discrimination',
      description: 'Learn about LGBTQ+ rights, discrimination protection, and resources for LGBTQ+ youth.',
      category: 'LGBTQ+ Rights',
      difficulty: 'Intermediate',
      estimatedTime: 19,
      questionCount: 24,
      rating: 4.7,
      completionRate: 70,
      tags: ['LGBTQ+', 'discrimination', 'rights'],
    },
  ];

  const categories = ['all', ...Array.from(new Set(quizzes.map(q => q.category)))];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleQuizClick = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setDialogOpen(true);
  };

  const handleStartQuiz = (quizId: string) => {
    // Navigate to quiz or open quiz component
    console.log(`Starting quiz: ${quizId}`);
    setDialogOpen(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
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
            Discover & Create Quiz
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Test your legal knowledge with interactive quizzes
          </Typography>
        </Box>

        {/* Search and Filter Controls */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search quizzes..."
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
            <Grid item xs={12} md={3}>
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
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Difficulty</InputLabel>
                <Select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  label="Difficulty"
                >
                  {difficulties.map((difficulty) => (
                    <MenuItem key={difficulty} value={difficulty}>
                      {difficulty === 'all' ? 'All Levels' : difficulty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Quiz Grid */}
        <Grid container spacing={3}>
          {filteredQuizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz.id}>
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
                  onClick={() => handleQuizClick(quiz)}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <QuizIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {quiz.title}
                        </Typography>
                        <Rating value={quiz.rating} readOnly size="small" />
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {quiz.description}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Chip 
                        label={quiz.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                      <Chip 
                        label={quiz.difficulty} 
                        size="small" 
                        color={getDifficultyColor(quiz.difficulty) as any}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TimerIcon fontSize="small" color="action" />
                        <Typography variant="body2">{quiz.estimatedTime} min</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SchoolIcon fontSize="small" color="action" />
                        <Typography variant="body2">{quiz.questionCount} questions</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Completion Rate:
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {quiz.completionRate}%
                      </Typography>
                    </Box>
                    
                    <LinearProgress 
                      variant="determinate" 
                      value={quiz.completionRate} 
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </CardContent>
                  
                  <CardActions>
                    <Button 
                      startIcon={<PlayIcon />}
                      variant="contained" 
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartQuiz(quiz.id);
                      }}
                    >
                      Start Quiz
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {filteredQuizzes.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <QuizIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No quizzes found matching your criteria
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </Box>
        )}
      </motion.div>

      {/* Quiz Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedQuiz && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">{selectedQuiz.title}</Typography>
                <IconButton onClick={() => setDialogOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedQuiz.description}
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Category</Typography>
                  <Typography variant="body1">{selectedQuiz.category}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Difficulty</Typography>
                  <Chip 
                    label={selectedQuiz.difficulty} 
                    color={getDifficultyColor(selectedQuiz.difficulty) as any}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Time Estimate</Typography>
                  <Typography variant="body1">{selectedQuiz.estimatedTime} minutes</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Questions</Typography>
                  <Typography variant="body1">{selectedQuiz.questionCount}</Typography>
                </Grid>
              </Grid>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Tags
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedQuiz.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Rating value={selectedQuiz.rating} readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({selectedQuiz.rating} stars)
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button 
                variant="contained" 
                startIcon={<PlayIcon />}
                onClick={() => handleStartQuiz(selectedQuiz.id)}
              >
                Start Quiz
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default QuizLibrary; 