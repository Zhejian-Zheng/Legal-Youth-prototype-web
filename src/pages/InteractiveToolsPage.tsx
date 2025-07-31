import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Container,
  Snackbar,
  Fab,
  Zoom,
  Badge,
  Divider,
  Avatar,
  CardActions,
} from '@mui/material';
import {
  Quiz as QuizIcon,
  Build as BuildIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  ExpandMore as ExpandMoreIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Refresh as RefreshIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Home as HomeIcon,
  ShoppingCart as ShoppingIcon,
  Security as SecurityIcon,
  FamilyRestroom as FamilyIcon,
  Help as HelpIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  action: string;
  resources: string[];
  estimatedTime: string;
  tips?: string[];
}

interface Tool {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'workflow';
  icon: React.ReactElement;
  color: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  completionRate: number;
  isPopular?: boolean;
  isNew?: boolean;
}

const InteractiveToolsPage: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [workflowStep, setWorkflowStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showWorkflowDialog, setShowWorkflowDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error' | 'info'>('success');
  const [completedTools, setCompletedTools] = useState<string[]>([]);
  const [favoriteTools, setFavoriteTools] = useState<string[]>([]);
  const navigate = useNavigate();

  const quizzes = [
    {
      id: 'employment-rights',
      title: 'Employment Rights Quiz',
      description: 'Test your knowledge about workplace rights and protections',
      icon: <WorkIcon />,
      color: '#1976d2',
      difficulty: 'beginner' as const,
      estimatedTime: '5-10 minutes',
      completionRate: 87,
      isPopular: true,
      questions: [
        {
          id: '1',
          question: 'Can your employer fire you without any reason?',
          options: [
            'Yes, in most states employment is "at-will"',
            'No, they need a valid reason',
            'Only if you\'ve been there less than 90 days',
            'Only if you\'re not in a union'
          ],
          correctAnswer: 0,
          explanation: 'In most states, employment is "at-will," meaning employers can fire employees for any reason or no reason at all, as long as it\'s not illegal (like discrimination).',
          category: 'Employment'
        },
        {
          id: '2',
          question: 'What is the current federal minimum wage?',
          options: [
            '$7.25 per hour',
            '$10.00 per hour',
            '$12.00 per hour',
            '$15.00 per hour'
          ],
          correctAnswer: 0,
          explanation: 'The federal minimum wage is $7.25 per hour, though many states have higher minimum wages.',
          category: 'Employment'
        },
        {
          id: '3',
          question: 'Can your employer require you to work overtime without pay?',
          options: [
            'Yes, if you\'re salaried',
            'No, overtime must be paid at 1.5x regular rate',
            'Only if you agreed to it in your contract',
            'Only for certain industries'
          ],
          correctAnswer: 1,
          explanation: 'Non-exempt employees must be paid overtime (1.5x regular rate) for hours worked over 40 in a week.',
          category: 'Employment'
        }
      ]
    },
    {
      id: 'tenant-rights',
      title: 'Tenant Rights Quiz',
      description: 'Learn about your rights as a tenant',
      icon: <HomeIcon />,
      color: '#2e7d32',
      difficulty: 'beginner' as const,
      estimatedTime: '5-8 minutes',
      completionRate: 92,
      questions: [
        {
          id: '1',
          question: 'Can your landlord enter your apartment without notice?',
          options: [
            'Yes, anytime they want',
            'No, they need to give reasonable notice',
            'Only in emergencies',
            'Only if you\'re behind on rent'
          ],
          correctAnswer: 2,
          explanation: 'Landlords can only enter without notice in emergencies. Otherwise, they must give reasonable notice (usually 24-48 hours).',
          category: 'Housing'
        },
        {
          id: '2',
          question: 'What happens to your security deposit when you move out?',
          options: [
            'Landlord keeps it automatically',
            'You get it back within 30 days if no damages',
            'It\'s non-refundable',
            'You get it back immediately'
          ],
          correctAnswer: 1,
          explanation: 'Landlords must return security deposits within 30 days or provide an itemized list of deductions.',
          category: 'Housing'
        }
      ]
    },
    {
      id: 'consumer-rights',
      title: 'Consumer Rights Quiz',
      description: 'Test your knowledge about consumer protection',
      icon: <ShoppingIcon />,
      color: '#9c27b0',
      difficulty: 'intermediate' as const,
      estimatedTime: '8-12 minutes',
      completionRate: 78,
      isNew: true,
      questions: [
        {
          id: '1',
          question: 'Can a company charge you for a "free trial"?',
          options: [
            'Yes, if you don\'t cancel',
            'No, free trials must be completely free',
            'Only for shipping costs',
            'Only for premium services'
          ],
          correctAnswer: 0,
          explanation: 'Many "free trials" automatically convert to paid subscriptions if you don\'t cancel within the trial period.',
          category: 'Consumer Rights'
        }
      ]
    }
  ];

  const workflows = [
    {
      id: 'eviction-defense',
      title: 'Eviction Defense Guide',
      description: 'Step-by-step guide to defending against eviction',
      icon: <HomeIcon />,
      color: '#2e7d32',
      difficulty: 'advanced' as const,
      estimatedTime: '30-45 minutes',
      completionRate: 65,
      isPopular: true,
      steps: [
        {
          id: '1',
          title: 'Review the Eviction Notice',
          description: 'Check if the notice is properly formatted and contains required information',
          action: 'Read the notice carefully and note the deadline',
          resources: ['Sample eviction notice', 'State-specific requirements'],
          estimatedTime: '15 minutes',
          tips: [
            'Check if the notice includes your name and address',
            'Verify the reason for eviction is valid',
            'Note the deadline for response'
          ]
        },
        {
          id: '2',
          title: 'Contact Legal Aid',
          description: 'Get free legal assistance to understand your rights',
          action: 'Call your local legal aid office',
          resources: ['Legal aid directory', 'Free consultation services'],
          estimatedTime: '30 minutes',
          tips: [
            'Have your eviction notice ready',
            'Prepare a list of questions',
            'Ask about emergency housing options'
          ]
        },
        {
          id: '3',
          title: 'File Your Response',
          description: 'Submit a written response to the court within the deadline',
          action: 'Complete and file the response form',
          resources: ['Response form template', 'Court filing instructions'],
          estimatedTime: '1 hour',
          tips: [
            'File before the deadline',
            'Keep copies of all documents',
            'Consider hiring a lawyer if possible'
          ]
        },
        {
          id: '4',
          title: 'Prepare for Court',
          description: 'Gather evidence and prepare your defense',
          action: 'Organize documents and practice your testimony',
          resources: ['Evidence checklist', 'Court preparation guide'],
          estimatedTime: '2 hours',
          tips: [
            'Bring all relevant documents',
            'Practice what you want to say',
            'Dress appropriately for court'
          ]
        }
      ]
    },
    {
      id: 'wage-claim',
      title: 'Wage Claim Process',
      description: 'How to file a claim for unpaid wages',
      icon: <WorkIcon />,
      color: '#1976d2',
      difficulty: 'intermediate' as const,
      estimatedTime: '20-30 minutes',
      completionRate: 72,
      steps: [
        {
          id: '1',
          title: 'Document Your Hours',
          description: 'Gather evidence of hours worked and wages owed',
          action: 'Collect pay stubs, time cards, and any written agreements',
          resources: ['Time tracking template', 'Wage calculation guide'],
          estimatedTime: '30 minutes',
          tips: [
            'Keep copies of all pay stubs',
            'Document any verbal agreements',
            'Take photos of time cards if needed'
          ]
        },
        {
          id: '2',
          title: 'Contact Your Employer',
          description: 'Try to resolve the issue directly with your employer',
          action: 'Send a written request for payment',
          resources: ['Sample demand letter', 'Communication tips'],
          estimatedTime: '1 hour',
          tips: [
            'Put everything in writing',
            'Keep records of all communication',
            'Be professional but firm'
          ]
        },
        {
          id: '3',
          title: 'File with Labor Board',
          description: 'Submit a formal complaint to your state labor board',
          action: 'Complete and submit the wage claim form',
          resources: ['Wage claim form', 'State labor board directory'],
          estimatedTime: '45 minutes',
          tips: [
            'Fill out forms completely',
            'Include all supporting documents',
            'Follow up on your claim'
          ]
        }
      ]
    }
  ];

  const tools: Tool[] = [
    ...quizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      type: 'quiz' as const,
      icon: quiz.icon,
      color: quiz.color,
      difficulty: quiz.difficulty,
      estimatedTime: quiz.estimatedTime,
      completionRate: quiz.completionRate,
      isPopular: quiz.isPopular,
      isNew: quiz.isNew,
    })),
    ...workflows.map(workflow => ({
      id: workflow.id,
      title: workflow.title,
      description: workflow.description,
      type: 'workflow' as const,
      icon: workflow.icon,
      color: workflow.color,
      difficulty: workflow.difficulty,
      estimatedTime: workflow.estimatedTime,
      completionRate: workflow.completionRate,
      isPopular: workflow.isPopular,
      isNew: workflow.isNew,
    }))
  ];

  const handleQuizStart = (quizId: string) => {
    setActiveQuiz(quizId);
    setQuizAnswers({});
    setShowResults(false);
  };

  const handleQuizAnswer = (questionId: string, answer: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleQuizSubmit = () => {
    setShowResults(true);
    const quiz = getCurrentQuiz();
    if (quiz && !completedTools.includes(quiz.id)) {
      setCompletedTools(prev => [...prev, quiz.id]);
      setSnackbarMessage('Quiz completed! Great job!');
      setSnackbarType('success');
      setShowSnackbar(true);
    }
  };

  const handleWorkflowStart = (workflowId: string) => {
    setActiveWorkflow(workflowId);
    setWorkflowStep(0);
    setShowWorkflowDialog(true);
  };

  const handleWorkflowNext = () => {
    const currentWorkflow = workflows.find(w => w.id === activeWorkflow);
    if (currentWorkflow && workflowStep < currentWorkflow.steps.length - 1) {
      setWorkflowStep(workflowStep + 1);
    } else if (currentWorkflow && workflowStep === currentWorkflow.steps.length - 1) {
      // Workflow completed
      if (!completedTools.includes(currentWorkflow.id)) {
        setCompletedTools(prev => [...prev, currentWorkflow.id]);
        setSnackbarMessage('Workflow completed! You\'re all set!');
        setSnackbarType('success');
        setShowSnackbar(true);
      }
    }
  };

  const handleWorkflowBack = () => {
    if (workflowStep > 0) {
      setWorkflowStep(workflowStep - 1);
    }
  };

  const handleFavorite = (toolId: string) => {
    setFavoriteTools(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
    setSnackbarMessage(
      favoriteTools.includes(toolId) 
        ? 'Removed from favorites' 
        : 'Added to favorites'
    );
    setSnackbarType('success');
    setShowSnackbar(true);
  };

  const handleShare = (tool: Tool) => {
    if (navigator.share) {
      navigator.share({
        title: tool.title,
        text: tool.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${tool.title}: ${tool.description}`);
      setSnackbarMessage('Link copied to clipboard!');
      setSnackbarType('info');
      setShowSnackbar(true);
    }
  };

  const getCurrentQuiz = () => {
    return quizzes.find(q => q.id === activeQuiz);
  };

  const getCurrentWorkflow = () => {
    return workflows.find(w => w.id === activeWorkflow);
  };

  const calculateQuizScore = () => {
    const quiz = getCurrentQuiz();
    if (!quiz) return 0;
    
    let correct = 0;
    quiz.questions.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#4caf50';
      case 'intermediate': return '#ff9800';
      case 'advanced': return '#f44336';
      default: return '#666';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Beginner';
      case 'intermediate': return 'Intermediate';
      case 'advanced': return 'Advanced';
      default: return difficulty;
    }
  };

  return (
    <>
      <Helmet>
        <title>Interactive Tools - Legal Youth</title>
        <meta name="description" content="Interactive legal tools, quizzes, and guided workflows to help you understand your rights." />
      </Helmet>

      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
            Interactive Legal Tools
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, textAlign: 'center', color: 'text.secondary' }}>
            Test your knowledge and get step-by-step guidance for common legal issues
          </Typography>
        </motion.div>

        {/* Tools Grid */}
        <Grid container spacing={4}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={4} key={tool.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                    position: 'relative',
                  }}
                >
                  {tool.isNew && (
                    <Chip
                      label="NEW"
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                      }}
                    />
                  )}
                  {tool.isPopular && (
                    <Chip
                      label="POPULAR"
                      color="secondary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: tool.isNew ? 40 : 8,
                        right: 8,
                        zIndex: 1,
                      }}
                    />
                  )}
                  
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          backgroundColor: tool.color,
                          color: 'white',
                          mr: 2,
                        }}
                      >
                        {tool.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                          {tool.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {tool.description}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip
                        label={tool.type === 'quiz' ? 'Quiz' : 'Workflow'}
                        size="small"
                        color={tool.type === 'quiz' ? 'primary' : 'secondary'}
                      />
                      <Chip
                        label={getDifficultyLabel(tool.difficulty)}
                        size="small"
                        sx={{ 
                          backgroundColor: getDifficultyColor(tool.difficulty),
                          color: 'white'
                        }}
                      />
                      <Chip
                        label={`${tool.completionRate}% completion`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TimerIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {tool.estimatedTime}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      {completedTools.includes(tool.id) && (
                        <Chip
                          label="Completed"
                          color="success"
                          size="small"
                          icon={<CheckIcon />}
                        />
                      )}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleFavorite(tool.id)}
                          color={favoriteTools.includes(tool.id) ? 'primary' : 'default'}
                        >
                          <StarIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleShare(tool)}
                        >
                          <ShareIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={tool.type === 'quiz' ? <QuizIcon /> : <BuildIcon />}
                      onClick={() => tool.type === 'quiz' ? handleQuizStart(tool.id) : handleWorkflowStart(tool.id)}
                      sx={{
                        backgroundColor: tool.color,
                        '&:hover': {
                          backgroundColor: tool.color,
                          opacity: 0.9,
                        },
                      }}
                    >
                      {tool.type === 'quiz' ? 'Start Quiz' : 'Start Workflow'}
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Quiz Dialog */}
        <Dialog
          open={!!activeQuiz}
          onClose={() => setActiveQuiz(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {getCurrentQuiz()?.title}
              <IconButton onClick={() => setActiveQuiz(null)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            {getCurrentQuiz() && !showResults && (
              <Box>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {getCurrentQuiz()!.description}
                </Typography>
                {getCurrentQuiz()!.questions.map((question, index) => (
                  <Box key={question.id} sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Question {index + 1}: {question.question}
                    </Typography>
                    <FormControl component="fieldset">
                      <RadioGroup
                        value={quizAnswers[question.id] || ''}
                        onChange={(e) => handleQuizAnswer(question.id, parseInt(e.target.value))}
                      >
                        {question.options.map((option, optionIndex) => (
                          <FormControlLabel
                            key={optionIndex}
                            value={optionIndex}
                            control={<Radio />}
                            label={option}
                            sx={{ mb: 1 }}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                ))}
              </Box>
            )}
            
            {getCurrentQuiz() && showResults && (
              <Box>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    Quiz Complete!
                  </Typography>
                  <Typography variant="h6" color="primary">
                    Score: {calculateQuizScore()}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={calculateQuizScore()}
                    sx={{ mt: 2, mb: 1 }}
                  />
                </Box>
                
                {getCurrentQuiz()!.questions.map((question, index) => (
                  <Accordion key={question.id} sx={{ mb: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Box sx={{ mr: 2 }}>
                          {quizAnswers[question.id] === question.correctAnswer ? (
                            <CheckIcon color="success" />
                          ) : (
                            <WarningIcon color="error" />
                          )}
                        </Box>
                        <Typography>
                          Question {index + 1}: {question.question}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>Your answer:</strong> {question.options[quizAnswers[question.id] || 0]}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                      </Typography>
                      <Alert severity="info">
                        <Typography variant="body2">
                          {question.explanation}
                        </Typography>
                      </Alert>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            {!showResults ? (
              <Button
                variant="contained"
                onClick={handleQuizSubmit}
                disabled={Object.keys(quizAnswers).length < getCurrentQuiz()!.questions.length}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => {
                  setActiveQuiz(null);
                  setShowResults(false);
                }}
              >
                Close
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Workflow Dialog */}
        <Dialog
          open={showWorkflowDialog}
          onClose={() => setShowWorkflowDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {getCurrentWorkflow()?.title}
              <IconButton onClick={() => setShowWorkflowDialog(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            {getCurrentWorkflow() && (
              <Box>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {getCurrentWorkflow()!.description}
                </Typography>
                
                <LinearProgress
                  variant="determinate"
                  value={((workflowStep + 1) / getCurrentWorkflow()!.steps.length) * 100}
                  sx={{ mb: 3 }}
                />
                
                <Stepper activeStep={workflowStep} orientation="vertical">
                  {getCurrentWorkflow()!.steps.map((step, index) => (
                    <Step key={step.id}>
                      <StepLabel>
                        <Typography variant="h6">{step.title}</Typography>
                      </StepLabel>
                      <StepContent>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {step.description}
                          </Typography>
                          
                          <Alert severity="info" sx={{ mb: 2 }}>
                            <Typography variant="body2">
                              <strong>Action:</strong> {step.action}
                            </Typography>
                          </Alert>
                          
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Estimated time:</strong> {step.estimatedTime}
                          </Typography>
                          
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            <strong>Resources:</strong>
                          </Typography>
                          <List dense>
                            {step.resources.map((resource, resourceIndex) => (
                              <ListItem key={resourceIndex}>
                                <ListItemIcon>
                                  <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary={resource} />
                              </ListItem>
                            ))}
                          </List>
                          
                          {step.tips && step.tips.length > 0 && (
                            <>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Tips:</strong>
                              </Typography>
                              <List dense>
                                {step.tips.map((tip, tipIndex) => (
                                  <ListItem key={tipIndex}>
                                    <ListItemIcon>
                                      <CheckIcon color="success" />
                                    </ListItemIcon>
                                    <ListItemText primary={tip} />
                                  </ListItem>
                                ))}
                              </List>
                            </>
                          )}
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleWorkflowBack}
              disabled={workflowStep === 0}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
            <Button
              onClick={handleWorkflowNext}
              disabled={workflowStep === getCurrentWorkflow()!.steps.length - 1}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
            {workflowStep === getCurrentWorkflow()!.steps.length - 1 && (
              <Button
                variant="contained"
                onClick={() => setShowWorkflowDialog(false)}
                startIcon={<CheckIcon />}
              >
                Complete
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setShowSnackbar(false)}
            severity={snackbarType}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default InteractiveToolsPage; 