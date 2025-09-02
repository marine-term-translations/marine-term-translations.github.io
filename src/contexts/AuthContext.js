import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/apiService';

const AuthContext = createContext();

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
      const userData = await apiService.getUserInfo(authToken);
      setUser(userData);
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
      const oauthData = await apiService.getOAuthLink();
      return oauthData;
    } catch (error) {
      console.error('Error getting OAuth link:', error);
      throw error;
    }
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const tokenData = await apiService.exchangeCodeForToken(code);
      const { access_token } = tokenData;
      
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