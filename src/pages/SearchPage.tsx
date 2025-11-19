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
  Tune as AdvancedIcon,
} from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Fuse from 'fuse.js';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  category: string;
  type: 'article' | 'faq' | 'resource';
  relevance: number;
  readTime: string;
  views: number;
  lastUpdated: string;
}

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategory, setSelectedCategory] = useState('all');

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
    },
    {
      id: '3',
      title: 'Student Loan Rights and Protections',
      content: 'Understanding your rights when dealing with student loans and debt collectors. Know what you can and cannot be forced to pay.',
      category: 'Education',
      type: 'article',
      relevance: 0.82,
      readTime: '6 min read',
      views: 756,
      lastUpdated: '2024-01-08',
    },
    {
      id: '4',
      title: 'Can my landlord enter my apartment without notice?',
      content: 'Landlords generally cannot enter your apartment without proper notice, except in emergencies. Learn about your privacy rights.',
      category: 'Housing',
      type: 'faq',
      relevance: 0.78,
      readTime: '2 min read',
      views: 543,
      lastUpdated: '2024-01-12',
    },
    {
      id: '5',
      title: 'Employment Contract Template',
      content: 'Downloadable template for employment contracts with explanations of key terms and conditions.',
      category: 'Employment',
      type: 'resource',
      relevance: 0.75,
      readTime: '3 min read',
      views: 432,
      lastUpdated: '2024-01-05',
    },
  ];

  const hotKeywords = [
    'tenant rights',
    'wrongful termination',
    'student loans',
    'eviction notice',
    'minimum wage',
    'discrimination',
    'privacy rights',
    'consumer protection',
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

  // Configure Fuse.js for fuzzy search
  const fuseOptions = {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'content', weight: 0.3 },
      { name: 'category', weight: 0.2 },
    ],
    threshold: 0.3,
    includeScore: true,
  };

  const fuse = new Fuse(mockData, fuseOptions);

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    }
  }, [searchQuery, selectedCategory, sortBy]);

  const performSearch = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let results = searchQuery ? fuse.search(searchQuery).map(result => result.item) : mockData;
      
      // Filter by category
      if (selectedCategory !== 'all') {
        results = results.filter(result => 
          result.category.toLowerCase() === selectedCategory
        );
      }
      
      // Sort results
      results.sort((a, b) => {
        switch (sortBy) {
          case 'relevance':
            return b.relevance - a.relevance;
          case 'views':
            return b.views - a.views;
          case 'recent':
            return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
          default:
            return b.relevance - a.relevance;
        }
      });
      
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    setSearchParams({ q: keyword });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
    setSearchResults([]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <ArticleIcon />;
      case 'faq':
        return <SchoolIcon />;
      case 'resource':
        return <WorkIcon />;
      default:
        return <ArticleIcon />;
    }
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
        <title>Search - Legal Youth</title>
        <meta name="description" content="Search for legal information, articles, and resources on Legal Youth." />
      </Helmet>

      <Container maxWidth="lg">
        {/* Search Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h3" component="h1">
              Search Legal Resources
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AdvancedIcon />}
              onClick={() => navigate('/advanced-search')}
            >
              Advanced Search
            </Button>
          </Box>
          
          {/* Search Bar */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box component="form" onSubmit={handleSearch}>
              <TextField
                fullWidth
                placeholder="Search for legal topics, articles, or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                size="medium"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <Tooltip title="Clear search">
                        <IconButton onClick={handleClearSearch} size="small">
                          <ClearIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>

          {/* Hot Keywords */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Popular Searches</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {hotKeywords.map((keyword) => (
                <Chip
                  key={keyword}
                  label={keyword}
                  variant="outlined"
                  clickable
                  onClick={() => handleKeywordClick(keyword)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Filters and Results */}
        {searchQuery && (
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <FormControl size="small" sx={{ minWidth: 150 }}>
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
              <Grid item>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value="relevance">Relevance</MenuItem>
                    <MenuItem value="views">Most Viewed</MenuItem>
                    <MenuItem value="recent">Most Recent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  {searchResults.length} results found
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Search Results */}
        {searchQuery && (
          <Box>
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
            ) : searchResults.length > 0 ? (
              <Grid container spacing={3}>
                {searchResults.map((result) => (
                  <Grid item xs={12} key={result.id}>
                    <Card
                      sx={{
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Box sx={{ mt: 0.5 }}>
                            {getTypeIcon(result.type)}
                          </Box>
                          <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                                {result.title}
                              </Typography>
                              <Chip
                                label={result.type}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {result.content}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                              <Chip
                                label={result.category}
                                size="small"
                                sx={{
                                  backgroundColor: getCategoryColor(result.category),
                                  color: 'white',
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {result.readTime}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {result.views} views
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Updated {new Date(result.lastUpdated).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Alert severity="info">
                No results found for "{searchQuery}". Try different keywords or browse our categories.
              </Alert>
            )}
          </Box>
        )}

        {/* Browse Categories */}
        {!searchQuery && (
          <Box>
            <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
              Browse by Category
            </Typography>
            <Grid container spacing={3}>
              {categories.slice(1).map((category) => (
                <Grid item xs={12} sm={6} md={4} key={category.value}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                    }}
                    onClick={() => handleKeywordClick(category.label)}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" component="h3">
                        {category.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
};

export default SearchPage; 