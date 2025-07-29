import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Alert,
  Divider,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Home as HomeIcon,
  ShoppingCart as ShoppingIcon,
  FamilyRestroom as FamilyIcon,
  Security as SecurityIcon,
  VolunteerActivism as VolunteerIcon,
  Groups as GroupsIcon,
  Support as SupportIcon,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const AboutUs: React.FC = () => {
  const supportingOrganizations = [
    {
      name: 'National Legal Aid & Defender Association',
      description: 'Leading organization for legal aid and public defense',
      website: 'https://www.nlada.org',
    },
    {
      name: 'American Bar Association',
      description: 'Professional organization for lawyers and legal professionals',
      website: 'https://www.americanbar.org',
    },
    {
      name: 'Youth Law Center',
      description: 'Advocacy organization focused on youth legal rights',
      website: 'https://ylc.org',
    },
    {
      name: 'Legal Services Corporation',
      description: 'Federal organization providing civil legal aid',
      website: 'https://www.lsc.gov',
    },
  ];

  const services = [
    {
      title: 'Employment Rights',
      description: 'Workplace rights, discrimination, wage claims',
      icon: <WorkIcon />,
      color: '#1976d2',
    },
    {
      title: 'Housing Rights',
      description: 'Tenant rights, eviction defense, housing discrimination',
      icon: <HomeIcon />,
      color: '#2e7d32',
    },
    {
      title: 'Family Law',
      description: 'Divorce, custody, child support, domestic violence',
      icon: <FamilyIcon />,
      color: '#ed6c02',
    },
    {
      title: 'Consumer Rights',
      description: 'Contracts, scams, debt collection, credit issues',
      icon: <ShoppingIcon />,
      color: '#9c27b0',
    },
    {
      title: 'Education Rights',
      description: 'Student rights, special education, discipline',
      icon: <SchoolIcon />,
      color: '#d32f2f',
    },
    {
      title: 'Privacy & Security',
      description: 'Digital rights, online privacy, data protection',
      icon: <SecurityIcon />,
      color: '#7b1fa2',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Legal Youth</title>
        <meta name="description" content="Learn about Legal Youth's mission to provide accessible legal information and resources for young people." />
      </Helmet>

      <Container maxWidth="lg">
        {/* Mission Statement */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
            About Legal Youth
          </Typography>
          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, color: 'primary.main' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}>
              Legal Youth is dedicated to making legal information accessible, understandable, and actionable for young people. 
              We believe that everyone deserves to understand their rights and have access to the resources they need to navigate 
              legal challenges confidently.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
              Our platform provides comprehensive legal resources, interactive tools, and step-by-step guidance to help young 
              people understand their rights in areas like employment, housing, education, consumer protection, and more. 
              We partner with legal professionals and organizations to ensure our content is accurate, up-to-date, and reliable.
            </Typography>
          </Paper>
        </Box>

        {/* Emergency Contact */}
        <Alert severity="error" sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            🚨 Emergency Legal Help Available 24/7
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            If you're facing an immediate legal crisis, don't wait. Our emergency hotline is available 24/7.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<PhoneIcon />}
              href="tel:1-800-EMERGENCY-LEGAL"
              sx={{ textTransform: 'none' }}
            >
              Call 1-800-EMERGENCY-LEGAL
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<EmailIcon />}
              href="mailto:emergency@legalyouth.org"
              sx={{ textTransform: 'none' }}
            >
              Email Emergency Support
            </Button>
          </Box>
        </Alert>

        {/* Services Grid */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
            Our Services
          </Typography>
          <Grid container spacing={3}>
            {services.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.title}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: service.color,
                          color: 'white',
                          borderRadius: '50%',
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {service.icon}
                      </Box>
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Supporting Organizations */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
            Supporting Organizations
          </Typography>
          <Grid container spacing={3}>
            {supportingOrganizations.map((org) => (
              <Grid item xs={12} md={6} key={org.name}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
                      {org.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {org.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Information */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
            Contact Information
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" component="h3" sx={{ mb: 3 }}>
                  General Inquiries
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={
                        <a href="mailto:info@legalyouth.org" style={{ color: 'inherit' }}>
                          info@legalyouth.org
                        </a>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary={
                        <a href="tel:1-800-LEGAL-YOUTH" style={{ color: 'inherit' }}>
                          1-800-LEGAL-YOUTH
                        </a>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Address"
                      secondary="123 Legal Street, Justice City, JC 12345"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TimeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Hours"
                      secondary="Monday - Friday: 9:00 AM - 6:00 PM EST"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" component="h3" sx={{ mb: 3 }}>
                  Get Involved
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <VolunteerIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Volunteer"
                      secondary="Join our team of legal professionals and advocates"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <GroupsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Partnership"
                      secondary="Partner with us to expand our reach and impact"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SupportIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Support"
                      secondary="Donate to help us provide free legal resources"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Quick Professional Advice */}
        <Paper sx={{ p: 4, mb: 4, backgroundColor: 'primary.light', color: 'white' }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            Quick Professional Advice
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem' }}>
            Our team of legal professionals is available to provide quick guidance on common legal issues. 
            While we cannot provide specific legal advice, we can help you understand your rights and 
            connect you with appropriate resources.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'white', color: 'primary.main' }}
              href="/tools"
            >
              Interactive Tools
            </Button>
            <Button
              variant="outlined"
              sx={{ borderColor: 'white', color: 'white' }}
              href="/resources"
            >
              Resource Library
            </Button>
          </Box>
        </Paper>

        {/* Disclaimer */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Disclaimer:</strong> The information provided on this website is for educational purposes only 
            and should not be considered as legal advice. While we strive to provide accurate and up-to-date 
            information, laws vary by jurisdiction and change over time. For specific legal advice, please 
            consult with a qualified attorney in your area.
          </Typography>
        </Alert>
      </Container>
    </>
  );
};

export default AboutUs; 