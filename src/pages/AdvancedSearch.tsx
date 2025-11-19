import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Chip,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
  Alert,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Slider,
  Switch,
  Radio,
  RadioGroup,
  FormLabel,
  Collapse,
  Badge,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingIcon,
  Article as ArticleIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Home as HomeIcon,
  ShoppingCart as ShoppingIcon,
  FamilyRestroom as FamilyIcon,
  Security as SecurityIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  ExpandMore as ExpandMoreIcon,
  Tune as TuneIcon,
  Save as SaveIcon,
  History as HistoryIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Tune as AdvancedIcon,
  DateRange as DateRangeIcon,
  Language as LanguageIcon,
  AccessTime as AccessTimeIcon,
  Visibility as VisibilityIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Fuse from 'fuse.js';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  category: string;
  type: 'article' | 'faq' | 'resource' | 'tool' | 'quiz';
  relevance: number;
  readTime: string;
  views: number;
  lastUpdated: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  author: string;
  rating: number;
  downloads: number;
}

interface SearchFilters {
  categories: string[];
  types: string[];
  difficulty: string;
  dateRange: [number, number];
  readTime: [number, number];
  language: string;
  rating: number;
  hasImages: boolean;
  hasVideos: boolean;
  isFree: boolean;
  isUpdated: boolean;
}

const AdvancedSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [searchName, setSearchName] = useState('');

  // Advanced filters state
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    types: [],
    difficulty: 'all',
    dateRange: [0, 100],
    readTime: [0, 60],
    language: 'all',
    rating: 0,
    hasImages: false,
    hasVideos: false,
    isFree: true,
    isUpdated: false,
  });

  // Available categories and types
  const categories = [
    'Employment', 'Housing', 'Education', 'Family', 'Consumer Rights',
    'Criminal Justice', 'Immigration', 'Healthcare', 'Taxes', 'Estate Planning'
  ];

  const contentTypes = [
    'article', 'faq', 'resource', 'tool', 'quiz'
  ];

  const difficulties = ['beginner', 'intermediate', 'advanced'];
  const languages = ['English', 'Spanish', 'French', 'Chinese', 'Arabic'];

  // Mock data for search
  const mockData: SearchResult[] = [
    {
      id: '1',
      title: 'Understanding Your Rights as a Tenant',
      content: 'Learn about your rights when renting, including what landlords can and cannot do. This comprehensive guide covers everything from security deposits to eviction procedures.',
      category: 'Housing',
      type: 'article',
      relevance: 0.95,
      readTime: '5 min read',
      views: 1247,
      lastUpdated: '2024-01-15',
      tags: ['renting', 'landlord', 'eviction', 'security deposit'],
      difficulty: 'beginner',
      language: 'English',
      author: 'Legal Aid Society',
      rating: 4.8,
      downloads: 156,
    },
    {
      id: '2',
      title: 'What to Do If You\'re Fired Without Notice',
      content: 'Your step-by-step guide to handling wrongful termination and seeking justice. Learn about your rights and the legal process.',
      category: 'Employment',
      type: 'article',
      relevance: 0.88,
      readTime: '8 min read',
      views: 892,
      lastUpdated: '2024-01-10',
      tags: ['employment', 'wrongful termination', 'unemployment'],
      difficulty: 'intermediate',
      language: 'English',
      author: 'Workplace Rights Center',
      rating: 4.6,
      downloads: 203,
    },
    {
      id: '3',
      title: 'Student Loan Rights and Protections',
      content: 'Understanding your rights when dealing with student loans and debt collectors. Know what you can and cannot be forced to pay.',
      category: 'Education',
      type: 'article',
      relevance: 0.82,
      readTime: '6 min read',
      views: 1567,
      lastUpdated: '2024-01-08',
      tags: ['student loans', 'debt collection', 'education'],
      difficulty: 'beginner',
      language: 'English',
      author: 'Student Legal Services',
      rating: 4.9,
      downloads: 342,
    },
    {
      id: '4',
      title: 'Interactive Tenant Rights Quiz',
      content: 'Test your knowledge about tenant rights with this interactive quiz. Learn through practice scenarios.',
      category: 'Housing',
      type: 'quiz',
      relevance: 0.78,
      readTime: '10 min read',
      views: 634,
      lastUpdated: '2024-01-12',
      tags: ['quiz', 'tenant rights', 'interactive'],
      difficulty: 'beginner',
      language: 'English',
      author: 'Legal Education Center',
      rating: 4.7,
      downloads: 89,
    },
    {
      id: '5',
      title: 'Advanced Employment Law Guide',
      content: 'Comprehensive guide for legal professionals and advanced users covering complex employment law scenarios.',
      category: 'Employment',
      type: 'resource',
      relevance: 0.75,
      readTime: '15 min read',
      views: 445,
      lastUpdated: '2024-01-05',
      tags: ['employment law', 'advanced', 'legal professionals'],
      difficulty: 'advanced',
      language: 'English',
      author: 'Employment Law Institute',
      rating: 4.5,
      downloads: 67,
    },
  ];

  const performSearch = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const fuse = new Fuse(mockData, {
        keys: ['title', 'content', 'tags'],
        threshold: 0.3,
      });

      let results = searchQuery 
        ? fuse.search(searchQuery).map(result => result.item)
        : mockData;

      // Apply filters
      results = results.filter(result => {
        if (filters.categories.length > 0 && !filters.categories.includes(result.category)) {
          return false;
        }
        if (filters.types.length > 0 && !filters.types.includes(result.type)) {
          return false;
        }
        if (filters.difficulty !== 'all' && result.difficulty !== filters.difficulty) {
          return false;
        }
        if (filters.language !== 'all' && result.language !== filters.language) {
          return false;
        }
        if (result.rating < filters.rating) {
          return false;
        }
        return true;
      });

      // Sort results
      results.sort((a, b) => {
        switch (sortBy) {
          case 'relevance':
            return b.relevance - a.relevance;
          case 'date':
            return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
          case 'views':
            return b.views - a.views;
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });

      setSearchResults(results);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    }
  }, [searchQuery, filters, sortBy]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchParams({ q: searchQuery });
    performSearch();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchParams({});
  };

  const handleSaveSearch = () => {
    if (searchName.trim()) {
      setSavedSearches([...savedSearches, searchName]);
      setShowSaveDialog(false);
      setSearchName('');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <ArticleIcon />;
      case 'faq':
        return <SchoolIcon />;
      case 'resource':
        return <LibraryIcon />;
      case 'tool':
        return <ToolsIcon />;
      case 'quiz':
        return <SchoolIcon />;
      default:
        return <ArticleIcon />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Employment': '#1976d2',
      'Housing': '#388e3c',
      'Education': '#f57c00',
      'Family': '#7b1fa2',
      'Consumer Rights': '#d32f2f',
      'Criminal Justice': '#5d4037',
      'Immigration': '#0288d1',
      'Healthcare': '#c2185b',
      'Taxes': '#fbc02d',
      'Estate Planning': '#8d6e63',
    };
    return colors[category] || '#757575';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#4caf50';
      case 'intermediate':
        return '#ff9800';
      case 'advanced':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Helmet>
        <title>Advanced Search - Legal Youth</title>
        <meta name="description" content="Advanced search functionality for legal resources, articles, and tools" />
      </Helmet>

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Advanced Search
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find legal resources with precision using advanced filters and search options
        </Typography>
      </Box>

      {/* Search Form */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for legal resources, articles, tools, and more..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClearSearch} size="small">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SearchIcon />}
                  fullWidth
                >
                  Search
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<TuneIcon />}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filters
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

        {/* Advanced Filters */}
        <Collapse in={showFilters}>
          <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="h6" gutterBottom>
              Advanced Filters
            </Typography>
            <Grid container spacing={3}>
              {/* Categories */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Categories</InputLabel>
                  <Select
                    multiple
                    value={filters.categories}
                    onChange={(e) => setFilters({...filters, categories: e.target.value as string[]})}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Content Types */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Content Types</InputLabel>
                  <Select
                    multiple
                    value={filters.types}
                    onChange={(e) => setFilters({...filters, types: e.target.value as string[]})}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {contentTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Difficulty */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Difficulty Level</InputLabel>
                  <Select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                  >
                    <MenuItem value="all">All Levels</MenuItem>
                    {difficulties.map((difficulty) => (
                      <MenuItem key={difficulty} value={difficulty}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Language */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={filters.language}
                    onChange={(e) => setFilters({...filters, language: e.target.value})}
                  >
                    <MenuItem value="all">All Languages</MenuItem>
                    {languages.map((language) => (
                      <MenuItem key={language} value={language}>
                        {language}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Rating */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Minimum Rating</InputLabel>
                  <Select
                    value={filters.rating}
                    onChange={(e) => setFilters({...filters, rating: e.target.value as number})}
                  >
                    <MenuItem value={0}>Any Rating</MenuItem>
                    <MenuItem value={3}>3+ Stars</MenuItem>
                    <MenuItem value={4}>4+ Stars</MenuItem>
                    <MenuItem value={4.5}>4.5+ Stars</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Additional Options */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={filters.isFree}
                        onChange={(e) => setFilters({...filters, isFree: e.target.checked})}
                      />
                    }
                    label="Free Resources Only"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={filters.isUpdated}
                        onChange={(e) => setFilters({...filters, isUpdated: e.target.checked})}
                      />
                    }
                    label="Recently Updated"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={filters.hasImages}
                        onChange={(e) => setFilters({...filters, hasImages: e.target.checked})}
                      />
                    }
                    label="With Images"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={filters.hasVideos}
                        onChange={(e) => setFilters({...filters, hasVideos: e.target.checked})}
                      />
                    }
                    label="With Videos"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Paper>

      {/* Search Options */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <FormControl size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="views">Most Viewed</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          startIcon={<SaveIcon />}
          onClick={() => setShowSaveDialog(true)}
        >
          Save Search
        </Button>

        <Button
          variant="outlined"
          startIcon={<HistoryIcon />}
        >
          Search History
        </Button>
      </Box>

      {/* Results */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {isLoading ? 'Searching...' : `${searchResults.length} results found`}
        </Typography>
      </Box>

      {/* Search Results */}
      {isLoading ? (
        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} key={item}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="60%" height={32} />
                  <Skeleton variant="text" width="40%" height={24} />
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="80%" height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {searchResults.map((result) => (
            <Grid item xs={12} key={result.id}>
              <Card elevation={2} sx={{ '&:hover': { elevation: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getTypeIcon(result.type)}
                      <Typography variant="h6" component="h2">
                        {result.title}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Bookmark">
                        <IconButton size="small">
                          <BookmarkIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share">
                        <IconButton size="small">
                          <ShareIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download">
                        <IconButton size="small">
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {result.content}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip
                      label={result.category}
                      size="small"
                      sx={{ backgroundColor: getCategoryColor(result.category), color: 'white' }}
                    />
                    <Chip
                      label={result.difficulty}
                      size="small"
                      sx={{ backgroundColor: getDifficultyColor(result.difficulty), color: 'white' }}
                    />
                    <Chip
                      label={result.language}
                      size="small"
                      variant="outlined"
                    />
                    {result.tags.slice(0, 3).map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {result.readTime}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {result.views} views
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Updated {result.lastUpdated}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StarIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                      <Typography variant="caption">
                        {result.rating}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Save Search Dialog */}
      <Dialog open={showSaveDialog} onClose={() => setShowSaveDialog(false)}>
        <DialogTitle>Save Search</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search Name"
            fullWidth
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter a name for this search"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSaveDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveSearch} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdvancedSearch; 