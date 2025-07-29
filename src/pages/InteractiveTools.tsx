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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
}

const InteractiveTools: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [workflowStep, setWorkflowStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showWorkflowDialog, setShowWorkflowDialog] = useState(false);
  const navigate = useNavigate();

  const quizzes = [
    {
      id: 'employment-rights',
      title: 'Employment Rights Quiz',
      description: 'Test your knowledge about workplace rights and protections',
      icon: <WorkIcon />,
      color: '#1976d2',
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
      steps: [
        {
          id: '1',
          title: 'Review the Eviction Notice',
          description: 'Check if the notice is properly formatted and contains required information',
          action: 'Read the notice carefully and note the deadline',
          resources: ['Sample eviction notice', 'State-specific requirements'],
          estimatedTime: '15 minutes'
        },
        {
          id: '2',
          title: 'Contact Legal Aid',
          description: 'Get free legal assistance to understand your rights',
          action: 'Call your local legal aid office',
          resources: ['Legal aid directory', 'Free consultation services'],
          estimatedTime: '30 minutes'
        },
        {
          id: '3',
          title: 'File Your Response',
          description: 'Submit a written response to the court within the deadline',
          action: 'Complete and file the response form',
          resources: ['Response form template', 'Court filing instructions'],
          estimatedTime: '1 hour'
        },
        {
          id: '4',
          title: 'Prepare for Court',
          description: 'Gather evidence and prepare your defense',
          action: 'Organize documents and practice your testimony',
          resources: ['Evidence checklist', 'Court preparation guide'],
          estimatedTime: '2 hours'
        }
      ]
    },
    {
      id: 'wage-claim',
      title: 'Wage Claim Process',
      description: 'How to file a claim for unpaid wages',
      icon: <WorkIcon />,
      color: '#1976d2',
      steps: [
        {
          id: '1',
          title: 'Document Your Hours',
          description: 'Gather evidence of hours worked and wages owed',
          action: 'Collect pay stubs, time cards, and any written agreements',
          resources: ['Time tracking template', 'Wage calculation guide'],
          estimatedTime: '30 minutes'
        },
        {
          id: '2',
          title: 'Contact Your Employer',
          description: 'Try to resolve the issue directly with your employer',
          action: 'Send a written request for payment',
          resources: ['Sample demand letter', 'Communication tips'],
          estimatedTime: '1 hour'
        },
        {
          id: '3',
          title: 'File with Labor Board',
          description: 'Submit a formal complaint to your state labor board',
          action: 'Complete and submit the wage claim form',
          resources: ['Wage claim form', 'State labor board directory'],
          estimatedTime: '45 minutes'
        }
      ]
    }
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
    }
  };

  const handleWorkflowBack = () => {
    if (workflowStep > 0) {
      setWorkflowStep(workflowStep - 1);
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

  return (
    <>
      <Helmet>
        <title>Interactive Tools - Legal Youth</title>
        <meta name="description" content="Interactive legal tools, quizzes, and guided workflows to help you understand your rights." />
      </Helmet>

      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
          Interactive Legal Tools
        </Typography>
        <Typography variant="h6" sx={{ mb: 6, textAlign: 'center', color: 'text.secondary' }}>
          Test your knowledge and get step-by-step guidance for common legal issues
        </Typography>

        {/* Tools Grid */}
        <Grid container spacing={4}>
          {/* Quizzes Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
              Rights Check Quizzes
            </Typography>
            <Grid container spacing={3}>
              {quizzes.map((quiz) => (
                <Grid item xs={12} key={quiz.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                    }}
                    onClick={() => handleQuizStart(quiz.id)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            backgroundColor: quiz.color,
                            color: 'white',
                            borderRadius: '50%',
                            p: 1,
                            mr: 2,
                          }}
                        >
                          {quiz.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                            {quiz.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {quiz.description}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        variant="contained"
                        startIcon={<PlayIcon />}
                        fullWidth
                      >
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Workflows Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
              Guided Workflows
            </Typography>
            <Grid container spacing={3}>
              {workflows.map((workflow) => (
                <Grid item xs={12} key={workflow.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                    }}
                    onClick={() => handleWorkflowStart(workflow.id)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            backgroundColor: workflow.color,
                            color: 'white',
                            borderRadius: '50%',
                            p: 1,
                            mr: 2,
                          }}
                        >
                          {workflow.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                            {workflow.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {workflow.description}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        variant="contained"
                        startIcon={<BuildIcon />}
                        fullWidth
                      >
                        Start Guide
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Quiz Dialog */}
        {activeQuiz && (
          <Dialog
            open={!!activeQuiz}
            onClose={() => setActiveQuiz(null)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5">
                  {getCurrentQuiz()?.title}
                </Typography>
                <IconButton onClick={() => setActiveQuiz(null)}>
                  <StopIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              {!showResults ? (
                <Box>
                  {getCurrentQuiz()?.questions.map((question, index) => (
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
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  ))}
                  <Button
                    variant="contained"
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < (getCurrentQuiz()?.questions.length || 0)}
                    fullWidth
                  >
                    Submit Quiz
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    <Typography variant="h6">
                      Quiz Complete! Your Score: {calculateQuizScore()}%
                    </Typography>
                  </Alert>
                  
                  {getCurrentQuiz()?.questions.map((question, index) => (
                    <Accordion key={question.id} sx={{ mb: 2 }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          {quizAnswers[question.id] === question.correctAnswer ? (
                            <CheckIcon color="success" />
                          ) : (
                            <WarningIcon color="error" />
                          )}
                          <Typography>
                            Question {index + 1}: {question.question}
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          <strong>Your Answer:</strong> {question.options[quizAnswers[question.id] || 0]}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          <strong>Correct Answer:</strong> {question.options[question.correctAnswer]}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Explanation:</strong> {question.explanation}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                  
                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button
                      variant="outlined"
                      startIcon={<RefreshIcon />}
                      onClick={() => {
                        setQuizAnswers({});
                        setShowResults(false);
                      }}
                    >
                      Retake Quiz
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setActiveQuiz(null)}
                    >
                      Close
                    </Button>
                  </Box>
                </Box>
              )}
            </DialogContent>
          </Dialog>
        )}

        {/* Workflow Dialog */}
        <Dialog
          open={showWorkflowDialog}
          onClose={() => setShowWorkflowDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h5">
                {getCurrentWorkflow()?.title}
              </Typography>
              <IconButton onClick={() => setShowWorkflowDialog(false)}>
                <StopIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            {getCurrentWorkflow() && (
              <Box>
                <LinearProgress
                  variant="determinate"
                  value={((workflowStep + 1) / getCurrentWorkflow()!.steps.length) * 100}
                  sx={{ mb: 3 }}
                />
                
                <Stepper activeStep={workflowStep} orientation="vertical">
                  {getCurrentWorkflow()!.steps.map((step, index) => (
                    <Step key={step.id}>
                      <StepLabel>
                        <Typography variant="h6">
                          Step {index + 1}: {step.title}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {step.description}
                          </Typography>
                          <Alert severity="info" sx={{ mb: 2 }}>
                            <strong>Action Required:</strong> {step.action}
                          </Alert>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
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
                          <Chip
                            label={`Estimated time: ${step.estimatedTime}`}
                            color="primary"
                            variant="outlined"
                            sx={{ mt: 1 }}
                          />
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={handleWorkflowBack}
                    disabled={workflowStep === 0}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleWorkflowNext}
                    disabled={workflowStep === getCurrentWorkflow()!.steps.length - 1}
                  >
                    Next
                  </Button>
                  {workflowStep === getCurrentWorkflow()!.steps.length - 1 && (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => setShowWorkflowDialog(false)}
                    >
                      Complete
                    </Button>
                  )}
                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default InteractiveTools; 