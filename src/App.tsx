import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import ResourceLibrary from './pages/ResourceLibrary';
import InteractiveTools from './pages/InteractiveTools';
import AboutUs from './pages/AboutUs';
import LegalAidMap from './pages/LegalAidMap';
import Forum from './pages/Forum';
import QuizLibrary from './pages/QuizLibrary';
import UserForums from './pages/UserForums';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/article/:articleId" element={<ArticlePage />} />
          <Route path="/resources" element={<ResourceLibrary />} />
          <Route path="/tools" element={<InteractiveTools />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/legal-aid-map" element={<LegalAidMap />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/quizzes" element={<QuizLibrary />} />
          <Route path="/forums" element={<UserForums />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </Box>
  );
}

export default App; 