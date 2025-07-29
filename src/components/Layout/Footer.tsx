import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { text: 'Home', href: '/' },
        { text: 'Search', href: '/search' },
        { text: 'Resources', href: '/resources' },
        { text: 'Tools', href: '/tools' },
        { text: 'Forum', href: '/forum' },
      ],
    },
    {
      title: 'Legal Categories',
      links: [
        { text: 'Employment', href: '/category/employment' },
        { text: 'Housing', href: '/category/housing' },
        { text: 'Family Law', href: '/category/family' },
        { text: 'Consumer Rights', href: '/category/consumer' },
        { text: 'Education', href: '/category/education' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'About Us', href: '/about' },
        { text: 'Legal Aid Map', href: '/legal-aid-map' },
        { text: 'Emergency Contact', href: '/emergency' },
        { text: 'Privacy Policy', href: '/privacy' },
        { text: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.900',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Main Footer Content */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {footerSections.map((section) => (
                <Grid item xs={12} sm={6} md={4} key={section.title}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      mb: 2,
                      fontWeight: 'bold',
                      color: 'primary.light',
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    {section.links.map((link) => (
                      <Box component="li" key={link.text} sx={{ mb: 1 }}>
                        <Link
                          href={link.href}
                          color="inherit"
                          sx={{
                            textDecoration: 'none',
                            '&:hover': {
                              color: 'primary.light',
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {link.text}
                        </Link>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                color: 'primary.light',
              }}
            >
              Contact Us
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmailIcon sx={{ mr: 1, fontSize: 'small' }} />
                <Typography variant="body2">
                  <Link
                    href="mailto:info@legalyouth.org"
                    color="inherit"
                    sx={{ textDecoration: 'none' }}
                  >
                    info@legalyouth.org
                  </Link>
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PhoneIcon sx={{ mr: 1, fontSize: 'small' }} />
                <Typography variant="body2">
                  <Link
                    href="tel:1-800-LEGAL-YOUTH"
                    color="inherit"
                    sx={{ textDecoration: 'none' }}
                  >
                    1-800-LEGAL-YOUTH
                  </Link>
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationIcon sx={{ mr: 1, fontSize: 'small' }} />
                <Typography variant="body2">
                  123 Legal Street<br />
                  Justice City, JC 12345
                </Typography>
              </Box>
            </Box>

            {/* Social Media Links */}
            <Typography
              variant="h6"
              component="h4"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                color: 'primary.light',
              }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                color="inherit"
                aria-label="Facebook"
                sx={{ '&:hover': { color: 'primary.light' } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Twitter"
                sx={{ '&:hover': { color: 'primary.light' } }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Instagram"
                sx={{ '&:hover': { color: 'primary.light' } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="LinkedIn"
                sx={{ '&:hover': { color: 'primary.light' } }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'grey.700' }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="grey.400">
            © 2024 Legal Youth. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link
              href="/accessibility"
              color="grey.400"
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.light' } }}
            >
              Accessibility Statement
            </Link>
            <Link
              href="/sitemap"
              color="grey.400"
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.light' } }}
            >
              Sitemap
            </Link>
          </Box>
        </Box>

        {/* Emergency Contact Banner */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: 'error.dark',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            🚨 Emergency Legal Help
          </Typography>
          <Typography variant="body2">
            If you're in immediate legal trouble, call our 24/7 hotline:{' '}
            <Link
              href="tel:1-800-EMERGENCY-LEGAL"
              color="inherit"
              sx={{ fontWeight: 'bold', textDecoration: 'underline' }}
            >
              1-800-EMERGENCY-LEGAL
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 