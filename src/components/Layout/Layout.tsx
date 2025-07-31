import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  LibraryBooks as LibraryIcon,
  Build as ToolsIcon,
  Map as MapIcon,
  Forum as ForumIcon,
  Person as PersonIcon,
  Info as InfoIcon,
  Accessibility as AccessibilityIcon,
  KeyboardArrowUp as ArrowUpIcon,
  School as SchoolIcon,
  Group as GroupIcon,
  Advanced as AdvancedIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Search', icon: <SearchIcon />, path: '/search' },
    { text: 'Advanced Search', icon: <AdvancedIcon />, path: '/advanced-search' },
    { text: 'Categories', icon: <CategoryIcon />, path: '/category/employment' },
    { text: 'Resource Library', icon: <LibraryIcon />, path: '/resource-library' },
    { text: 'Interactive Tools', icon: <ToolsIcon />, path: '/interactive-tools' },
    { text: 'Quiz Library', icon: <SchoolIcon />, path: '/quizzes' },
    { text: 'User Forums', icon: <GroupIcon />, path: '/forums' },
    { text: 'Legal Aid Map', icon: <MapIcon />, path: '/legal-aid-map' },
    { text: 'Forum', icon: <ForumIcon />, path: '/forum' },
    { text: 'About Us', icon: <InfoIcon />, path: '/about' },
    { text: 'Book Volunteer Lawyer', icon: <PersonIcon />, path: '/book-volunteer-lawyer' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {navigationItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Header onMenuClick={handleDrawerToggle} />

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Navigation Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { md: 250 },
          flexShrink: { md: 0 },
          display: { xs: 'none', md: 'block' },
        }}
        aria-label="main navigation"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 250,
              top: 64, // Below header
              height: 'calc(100vh - 64px)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - 250px)` },
          ml: { md: '250px' },
          mt: '64px', // Below header
        }}
      >
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </Container>
      </Box>

      {/* Scroll to Top Button */}
      <Tooltip title="Scroll to top" placement="left">
        <Fab
          color="primary"
          size="small"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon />
        </Fab>
      </Tooltip>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout; 