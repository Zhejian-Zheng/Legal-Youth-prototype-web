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
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

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
}

const ResourceLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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
    
    const matchesCategory = selectedCategory === 'all' || 
                           resource.category.toLowerCase() === selectedCategory;
    
    const matchesType = selectedType === 'all' || 
                       resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDownload = (resource: Resource) => {
    // Simulate download
    console.log('Downloading:', resource.title);
    // In a real app, this would trigger the actual download
  };

  const handlePreview = (resource: Resource) => {
    setSelectedResource(resource);
    setShowPreview(true);
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
        return <DocIcon />;
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
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          Resource Library
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
          Download templates, infographics, and educational videos to help you understand your legal rights
        </Typography>

        {/* Search and Filters */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
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
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
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
        {filteredResources.length > 0 ? (
          <Grid container spacing={3}>
            {filteredResources.map((resource) => (
              <Grid item xs={12} sm={6} md={4} key={resource.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={resource.image}
                    alt={resource.title}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {getTypeIcon(resource.type)}
                      <Chip
                        label={resource.type}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                    
                    <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
                      {resource.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                      {resource.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mr: 2,
                        }}
                      >
                        {getCategoryIcon(resource.category)}
                        <Chip
                          label={resource.category}
                          size="small"
                          sx={{
                            ml: 1,
                            backgroundColor: getCategoryColor(resource.category),
                            color: 'white',
                          }}
                        />
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        {resource.fileSize}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {resource.downloadCount} downloads
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownload(resource)}
                        sx={{ flexGrow: 1 }}
                      >
                        Download
                      </Button>
                      <Tooltip title="Preview">
                        <IconButton
                          onClick={() => handlePreview(resource)}
                          color="primary"
                        >
                          <PlayIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info">
            No resources found matching your search criteria. Try adjusting your filters.
          </Alert>
        )}

        {/* Preview Dialog */}
        <Dialog
          open={showPreview}
          onClose={() => setShowPreview(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedResource && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {getTypeIcon(selectedResource.type)}
                  <Typography variant="h6">
                    {selectedResource.title}
                  </Typography>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <img
                      src={selectedResource.image}
                      alt={selectedResource.title}
                      style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {selectedResource.description}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <strong>Details:</strong>
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <InfoIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Category"
                            secondary={selectedResource.category}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <GetAppIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="File Size"
                            secondary={selectedResource.fileSize}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <DownloadIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Downloads"
                            secondary={selectedResource.downloadCount}
                          />
                        </ListItem>
                      </List>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <strong>Tags:</strong>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {selectedResource.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowPreview(false)}>
                  Close
                </Button>
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
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </>
  );
};

export default ResourceLibrary; 