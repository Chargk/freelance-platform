import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { BoardPage } from './pages/BoardPage';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const { token } = useAuthStore();

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route 
            path="/" 
            element={<HomePage />} 
          />
          
          <Route 
            path="/login" 
            element={
              token ? <Navigate to="/" replace /> : <LoginPage />
            } 
          />
          
          <Route 
            path="/register" 
            element={
              token ? <Navigate to="/" replace /> : <RegisterPage />
            } 
          />

          {/* Protected routes */}
          <Route 
            path="/board" 
            element={
              <PrivateRoute>
                <BoardPage />
              </PrivateRoute>
            } 
          />

          {/* Catch all route */}
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;