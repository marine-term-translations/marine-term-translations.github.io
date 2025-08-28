import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Backend API base URL - adjust as needed
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = React.useCallback(() => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('github_token');
  }, []);

  const fetchUserInfo = React.useCallback(async (authToken) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/github/user`, {
        headers: {
          Authorization: authToken
        }
      });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching user info:', error);
      // Token might be invalid, clear it
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    // Check for existing token in localStorage
    const storedToken = localStorage.getItem('github_token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserInfo(storedToken);
    } else {
      setLoading(false);
    }
  }, [fetchUserInfo]);

  const getOAuthLink = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/github/oauth/link`);
      return response.data;
    } catch (error) {
      console.error('Error getting OAuth link:', error);
      throw error;
    }
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/github/token`, { code });
      const { access_token } = response.data;
      
      if (access_token) {
        const fullToken = `token ${access_token}`;
        setToken(fullToken);
        localStorage.setItem('github_token', fullToken);
        await fetchUserInfo(fullToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  };

  const login = async () => {
    try {
      const oauthData = await getOAuthLink();
      const { client_id, scope } = oauthData;
      
      // Redirect to GitHub OAuth
      const redirectUri = window.location.origin + window.location.pathname;
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirectUri}`;
      
      window.location.href = githubAuthUrl;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    token,
    user,
    loading,
    login,
    logout,
    exchangeCodeForToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};