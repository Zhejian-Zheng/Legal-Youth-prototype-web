import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Container,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  LinearProgress,
  Fab,
  Zoom,
} from '@mui/material';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  PlayArrow as PlayIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  FilterList as FilterIcon,
  Info as InfoIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Home as HomeIcon,
  ShoppingCart as ShoppingIcon,
  FamilyRestroom as FamilyIcon,
  Security as SecurityIcon,
  GetApp as GetAppIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'template' | 'infographic' | 'video';
  category: string;
  fileSize: string;
  downloadCount: number;
  image: string;
  downloadUrl: string;
  tags: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

const ResourceLibraryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [downloadingResource, setDownloadingResource] = useState<Resource | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error' | 'info'>('success');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Employment Contract Template',
      description: 'Standard employment contract template with explanations of key terms and conditions.',
      type: 'template',
      category: 'Employment',
      fileSize: '2.3 MB',
      downloadCount: 1247,
      image: '/api/placeholder/300/200',
      downloadUrl: '/downloads/employment-contract-template.pdf',
      tags: ['contract', 'employment', 'legal document'],
      isPopular: true,
    },
    {
      id: '2',
      title: 'Tenant Rights Infographic',
      description: 'Visual guide to tenant rights and responsibilities in an easy-to-understand format.',
      type: 'infographic',
      category: 'Housing',
      fileSize: '1.8 MB',
      downloadCount: 892,
      image: '/api/placeholder/300/200',
      downloadUrl: '/downloads/tenant-rights-infographic.pdf',
      tags: ['tenant rights', 'housing', 'visual guide'],
    },
    {
      id: '3',
      title: 'How to File a Wage Claim',
      description: 'Step-by-step video guide on filing a wage claim with your state labor board.',
      type: 'video',
      category: 'Employment',
      fileSize: '15.2 MB',
      downloadCount: 543,
      image: '/api/placeholder/300/200',
      downloadUrl: '/downloads/wage-claim-guide.mp4',
      tags: ['wage claim', 'employment', 'video guide'],
      isNew: true,
    },
    {
      id: '4',
      title: 'Eviction Notice Response Template',
      description: 'Template letter to respond to an eviction notice with proper legal language.',
      type: 'template',
      category: 'Housing',
      fileSize: '1.1 MB',
      downloadCount: 756,
      image: '/api/placeholder/300/200',
      downloadUrl: '/downloads/eviction-response-template.pdf',
      tags: ['eviction', 'housing', 'response letter'],
    },
    {
      id: '5',
      title: 'Consumer Rights Checklist',
      description: 'Comprehensive checklist of consumer rights and protections when making purchases.',
      type: 'infographic',
      category: 'Consumer Rights',
      fileSize: '2.5 MB',
      downloadCount: 432,
      image: '/api/placeholder/300/200',
      downloadUrl: '/downloads/consumer-rights-checklist.pdf',
      tags: ['consumer rights', 'checklist', 'protection'],
    },
    {
      id: '6',
      title: 'Student Loan Rights Video',
      description: 'Educational video explaining student loan rights and how to deal with debt collectors.',
      type: 'video',
      category: 'Education',
      fileSize: '22.1 MB',
      downloadCount: 321,
      image: '/api/placeholder/300/200',
      downloadUrl: '/downloads/student-loan-rights.mp4',
      tags: ['student loans', 'education', 'debt'],
    },
    {
      id: '7',
      title: 'Family Law Guide Template',
      description: 'Comprehensive guide for common family law issues including custody and support.',
      type: 'template',
      category: 'Family Law',
      fileSize: '3.1 MB',
      downloadCount: 654,
      image: '/api/placeholder/300/200',
      downloadUrl: '/downloads/family-law-guide.pdf',
      tags: ['family law', 'custody', 'support'],
      isNew: true,
    },
    {
      id: '8',
      title: 'Privacy Rights Infographic',
      description: 'Visual guide to your privacy rights and how to protect your personal information.',
      type: 'infographic',
      category: 'Privacy & Security',
      fileSize: '1.9 MB',
      downloadCount: 298,
      image: '/api/placeholder/300/200',
      downloadUrl: '/downloads/privacy-rights-infographic.pdf',
      tags: ['privacy', 'security', 'personal data'],
    },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'employment', label: 'Employment' },
    { value: 'housing', label: 'Housing' },
    { value: 'family', label: 'Family Law' },
    { value: 'consumer', label: 'Consumer Rights' },
    { value: 'education', label: 'Education' },
    { value: 'privacy', label: 'Privacy & Security' },
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'template', label: 'Templates' },
    { value: 'infographic', label: 'Infographics' },
    { value: 'video', label: 'Videos' },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category.toLowerCase() === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDownload = async (resource: Resource) => {
    setDownloadingResource(resource);
    setDownloadProgress(0);
    setShowDownloadDialog(true);

    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setDownloadProgress(i);
    }

    // Simulate download completion
    setTimeout(() => {
      setShowDownloadDialog(false);
      setDownloadingResource(null);
      setDownloadProgress(0);
      setSnackbarMessage(`${resource.title} downloaded successfully!`);
      setSnackbarType('success');
      setShowSnackbar(true);
    }, 1500);
  };

  const handlePreview = (resource: Resource) => {
    setSelectedResource(resource);
    setShowPreview(true);
  };

  const handleFavorite = (resourceId: string) => {
    setFavorites(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
    setSnackbarMessage(
      favorites.includes(resourceId) 
        ? 'Removed from favorites' 
        : 'Added to favorites'
    );
    setSnackbarType('success');
    setShowSnackbar(true);
  };

  const handleShare = (resource: Resource) => {
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        text: resource.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${resource.title}: ${resource.description}`);
      setSnackbarMessage('Link copied to clipboard!');
      setSnackbarType('info');
      setShowSnackbar(true);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'template':
        return <DocIcon />;
      case 'infographic':
        return <ImageIcon />;
      case 'video':
        return <VideoIcon />;
      default:
        return <Description as DocIcon />;
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      'Employment': <WorkIcon />,
      'Housing': <HomeIcon />,
      'Family Law': <FamilyIcon />,
      'Consumer Rights': <ShoppingIcon />,
      'Education': <SchoolIcon />,
      'Privacy & Security': <SecurityIcon />,
    };
    return icons[category] || <InfoIcon />;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Employment': '#1976d2',
      'Housing': '#2e7d32',
      'Family Law': '#ed6c02',
      'Consumer Rights': '#9c27b0',
      'Education': '#d32f2f',
      'Privacy & Security': '#7b1fa2',
    };
    return colors[category] || '#666';
  };

  return (
    <>
      <Helmet>
        <title>Resource Library - Legal Youth</title>
        <meta name="description" content="Download legal templates, infographics, and educational videos from our comprehensive resource library." />
      </Helmet>

      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" component="h1" sx={{ mb: 2, textAlign: 'center' }}>
            Resource Library
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', textAlign: 'center' }}>
            Download templates, infographics, and educational videos to help you understand your legal rights
          </Typography>
        </motion.div>

        {/* Search and Filters */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search resources..."
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
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  label="Type"
                >
                  {types.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Resources Grid */}
        <Grid container spacing={3}>
          {filteredResources.map((resource, index) => (
            <Grid item xs={12} sm={6} md={4} key={resource.id}>
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
                  {resource.isNew && (
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
                  {resource.isPopular && (
                    <Chip
                      label="POPULAR"
                      color="secondary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: resource.isNew ? 40 : 8,
                        right: 8,
                        zIndex: 1,
                      }}
                    />
                  )}
                  
                  <CardMedia
                    component="img"
                    height="200"
                    image={resource.image}
                    alt={resource.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          backgroundColor: getCategoryColor(resource.category),
                          color: 'white',
                          borderRadius: '50%',
                          p: 0.5,
                          mr: 1,
                        }}
                      >
                        {getCategoryIcon(resource.category)}
                      </Box>
                      <Chip
                        label={resource.type}
                        size="small"
                        icon={getTypeIcon(resource.type)}
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {resource.fileSize}
                      </Typography>
                    </Box>
                    
                    <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
                      {resource.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                      {resource.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" />
                      ))}
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        {resource.downloadCount} downloads
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleFavorite(resource.id)}
                          color={favorites.includes(resource.id) ? 'primary' : 'default'}
                        >
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleShare(resource)}
                        >
                          <ShareIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ViewIcon />}
                        onClick={() => handlePreview(resource)}
                        sx={{ flex: 1 }}
                      >
                        Preview
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownload(resource)}
                        sx={{ flex: 1 }}
                      >
                        Download
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {filteredResources.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No resources found matching your criteria
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}
              sx={{ mt: 2 }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
      </Container>

      {/* Preview Dialog */}
      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {selectedResource?.title}
            <IconButton onClick={() => setShowPreview(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedResource && (
            <Box>
              <img
                src={selectedResource.image}
                alt={selectedResource.title}
                style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
              />
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedResource.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedResource.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary">
                File size: {selectedResource.fileSize} | Downloads: {selectedResource.downloadCount}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPreview(false)}>Close</Button>
          {selectedResource && (
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={() => {
                handleDownload(selectedResource);
                setShowPreview(false);
              }}
            >
              Download
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Download Progress Dialog */}
      <Dialog open={showDownloadDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Downloading {downloadingResource?.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%', mt: 2 }}>
            <LinearProgress variant="determinate" value={downloadProgress} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {downloadProgress}% complete
            </Typography>
          </Box>
        </DialogContent>
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
    </>
  );
};

export default ResourceLibraryPage; 