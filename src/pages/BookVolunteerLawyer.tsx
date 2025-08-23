import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Paper,
  Alert,
  Snackbar,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  CheckCircle as CheckIcon,
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  languages: string[];
  availability: string[];
  image: string;
  bio: string;
  education: string;
  barNumber: string;
}

const BookVolunteerLawyer: React.FC = () => {
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    legalIssue: '',
    preferredDate: '',
    preferredTime: '',
    urgency: 'medium',
    description: '',
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error' | 'info'>('success');

  const lawyers: Lawyer[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      specialization: 'Employment Law',
      experience: '8 years',
      rating: 4.8,
      languages: ['English', 'Spanish'],
      availability: ['Monday', 'Wednesday', 'Friday'],
      image: '/api/placeholder/150/150',
      bio: 'Specialized in employment discrimination, wage disputes, and workplace harassment cases.',
      education: 'J.D., Harvard Law School',
      barNumber: 'CA-123456',
    },
    {
      id: '2',
      name: 'Michael Chen',
      specialization: 'Housing Law',
      experience: '12 years',
      rating: 4.9,
      languages: ['English', 'Mandarin'],
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      image: '/api/placeholder/150/150',
      bio: 'Expert in tenant rights, eviction defense, and housing discrimination cases.',
      education: 'J.D., Stanford Law School',
      barNumber: 'CA-234567',
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      specialization: 'Family Law',
      experience: '10 years',
      rating: 4.7,
      languages: ['English', 'Spanish'],
      availability: ['Monday', 'Tuesday', 'Thursday'],
      image: '/api/placeholder/150/150',
      bio: 'Specialized in divorce, child custody, and domestic violence protection orders.',
      education: 'J.D., UCLA School of Law',
      barNumber: 'CA-345678',
    },
    {
      id: '4',
      name: 'David Kim',
      specialization: 'Consumer Rights',
      experience: '6 years',
      rating: 4.6,
      languages: ['English', 'Korean'],
      availability: ['Wednesday', 'Friday', 'Saturday'],
      image: '/api/placeholder/150/150',
      bio: 'Expert in consumer protection, debt collection defense, and contract disputes.',
      education: 'J.D., UC Berkeley School of Law',
      barNumber: 'CA-456789',
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      specialization: 'Immigration Law',
      experience: '15 years',
      rating: 4.9,
      languages: ['English', 'French', 'Haitian Creole'],
      availability: ['Monday', 'Wednesday', 'Friday'],
      image: '/api/placeholder/150/150',
      bio: 'Specialized in asylum cases, family-based immigration, and deportation defense.',
      education: 'J.D., Yale Law School',
      barNumber: 'CA-567890',
    },
    {
      id: '6',
      name: 'James Wilson',
      specialization: 'Criminal Defense',
      experience: '14 years',
      rating: 4.8,
      languages: ['English'],
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      image: '/api/placeholder/150/150',
      bio: 'Expert in criminal defense, juvenile law, and expungement cases.',
      education: 'J.D., USC Gould School of Law',
      barNumber: 'CA-678901',
    },
  ];

  const handleLawyerSelect = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setShowBookingDialog(true);
    setBookingStep(0);
  };

  const handleBookingFormChange = (field: string, value: string) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBookingSubmit = () => {
    // Simulate booking submission
    setSnackbarMessage('Booking request submitted successfully! We\'ll contact you within 24 hours.');
    setSnackbarType('success');
    setShowSnackbar(true);
    setShowBookingDialog(false);
    setBookingStep(0);
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      legalIssue: '',
      preferredDate: '',
      preferredTime: '',
      urgency: 'medium',
      description: '',
    });
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        sx={{
          color: i < Math.floor(rating) ? '#ffc107' : '#e0e0e0',
          fontSize: '1rem',
        }}
      />
    ));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#ff9800';
    }
  };

  return (
    <>
      <Helmet>
        <title>Book Volunteer Lawyer - Legal Youth</title>
        <meta name="description" content="Connect with volunteer lawyers for free legal consultation and representation." />
      </Helmet>

      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" component="h1" sx={{ mb: 2, textAlign: 'center' }}>
            Book Volunteer Lawyer
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', textAlign: 'center' }}>
            Connect with experienced volunteer lawyers for free legal consultation and representation
          </Typography>
        </motion.div>

        {/* Info Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Free Consultation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Initial consultation is completely free
                </Typography>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <WorkIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Experienced Lawyers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Licensed attorneys with years of experience
                </Typography>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <ScheduleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Flexible Scheduling
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Book appointments that work for you
                </Typography>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <LanguageIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Multiple Languages
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lawyers available in various languages
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Lawyers Grid */}
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Available Volunteer Lawyers
        </Typography>
        <Grid container spacing={3}>
          {lawyers.map((lawyer, index) => (
            <Grid item xs={12} sm={6} md={4} key={lawyer.id}>
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
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => handleLawyerSelect(lawyer)}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={lawyer.image}
                        sx={{ width: 60, height: 60, mr: 2 }}
                      >
                        <PersonIcon />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                          {lawyer.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {lawyer.specialization}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {getRatingStars(lawyer.rating)}
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {lawyer.rating} ({lawyer.experience} experience)
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {lawyer.bio}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Languages:</strong>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {lawyer.languages.map((language) => (
                          <Chip key={language} label={language} size="small" />
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Available:</strong>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {lawyer.availability.map((day) => (
                          <Chip key={day} label={day} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                    >
                      Book Consultation
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Booking Dialog */}
      <Dialog
        open={showBookingDialog}
        onClose={() => setShowBookingDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Book Consultation with {selectedLawyer?.name}
            <IconButton onClick={() => setShowBookingDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedLawyer && (
            <Box>
              <Stepper activeStep={bookingStep} orientation="vertical">
                <Step>
                  <StepLabel>Your Information</StepLabel>
                  <StepContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={bookingForm.name}
                          onChange={(e) => handleBookingFormChange('name', e.target.value)}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          value={bookingForm.email}
                          onChange={(e) => handleBookingFormChange('email', e.target.value)}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={bookingForm.phone}
                          onChange={(e) => handleBookingFormChange('phone', e.target.value)}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          onClick={() => setBookingStep(1)}
                          disabled={!bookingForm.name || !bookingForm.email}
                        >
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </StepContent>
                </Step>

                <Step>
                  <StepLabel>Legal Issue Details</StepLabel>
                  <StepContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Legal Issue Category"
                          value={bookingForm.legalIssue}
                          onChange={(e) => handleBookingFormChange('legalIssue', e.target.value)}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <InputLabel>Urgency Level</InputLabel>
                          <Select
                            value={bookingForm.urgency}
                            onChange={(e) => handleBookingFormChange('urgency', e.target.value)}
                            label="Urgency Level"
                          >
                            <MenuItem value="low">Low - General consultation</MenuItem>
                            <MenuItem value="medium">Medium - Need advice soon</MenuItem>
                            <MenuItem value="high">High - Urgent legal matter</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          label="Brief Description of Your Issue"
                          value={bookingForm.description}
                          onChange={(e) => handleBookingFormChange('description', e.target.value)}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button
                            variant="outlined"
                            onClick={() => setBookingStep(0)}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => setBookingStep(2)}
                            disabled={!bookingForm.legalIssue || !bookingForm.description}
                          >
                            Next
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </StepContent>
                </Step>

                <Step>
                  <StepLabel>Schedule Appointment</StepLabel>
                  <StepContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Preferred Date"
                          type="date"
                          value={bookingForm.preferredDate}
                          onChange={(e) => handleBookingFormChange('preferredDate', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Preferred Time"
                          type="time"
                          value={bookingForm.preferredTime}
                          onChange={(e) => handleBookingFormChange('preferredTime', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Alert severity="info" sx={{ mb: 2 }}>
                          <Typography variant="body2">
                            <strong>Available Times:</strong> {selectedLawyer.availability.join(', ')}
                          </Typography>
                        </Alert>
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button
                            variant="outlined"
                            onClick={() => setBookingStep(1)}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleBookingSubmit}
                            disabled={!bookingForm.preferredDate || !bookingForm.preferredTime}
                          >
                            Submit Booking Request
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </StepContent>
                </Step>
              </Stepper>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
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
    </>
  );
};

export default BookVolunteerLawyer; 