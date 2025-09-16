// Session management utilities for GitHub authentication
// Handles both session cookies and mock data for development

/**
 * Set a session cookie
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Expiration in days (defaults to session)
 */
export const setSessionCookie = (name, value, days = null) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Lax`;
};

/**
 * Get a session cookie value
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null if not found
 */
export const getSessionCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Clear a session cookie
 * @param {string} name - Cookie name
 */
export const clearSessionCookie = (name) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

/**
 * Mock user data for development purposes
 */
const MOCK_USERS = {
  'octocat': { login: 'octocat', name: 'The Octocat', avatar_url: 'https://github.com/octocat.png' },
  'coder123': { login: 'coder123', name: 'Jane Coder', avatar_url: 'https://github.com/coder123.png' },
  'devgirl': { login: 'devgirl', name: 'Sarah Dev', avatar_url: 'https://github.com/devgirl.png' },
  'marinedev': { login: 'marinedev', name: 'Marine Developer', avatar_url: 'https://github.com/marinedev.png' },
  'translator99': { login: 'translator99', name: 'Alex Translator', avatar_url: 'https://github.com/translator99.png' },
  'scriptkid': { login: 'scriptkid', name: 'Script Kid', avatar_url: 'https://github.com/scriptkid.png' },
  'bughunter': { login: 'bughunter', name: 'Bug Hunter', avatar_url: 'https://github.com/bughunter.png' },
  'openSourceFan': { login: 'openSourceFan', name: 'Open Source Fan', avatar_url: 'https://github.com/openSourceFan.png' },
  'techwriter': { login: 'techwriter', name: 'Tech Writer', avatar_url: 'https://github.com/techwriter.png' },
  'designguru': { login: 'designguru', name: 'Design Guru', avatar_url: 'https://github.com/designguru.png' },
  'newbieDev': { login: 'newbieDev', name: 'Newbie Developer', avatar_url: 'https://github.com/newbieDev.png' },
  'veteranCoder': { login: 'veteranCoder', name: 'Veteran Coder', avatar_url: 'https://github.com/veteranCoder.png' },
};

/**
 * Get current session user from cookie or mock data
 * @returns {Object|null} User object or null if not logged in
 */
export const getCurrentUser = () => {
  // Check for development mock user first
  const mockUser = getSessionCookie('mock_github_user');
  if (mockUser && MOCK_USERS[mockUser]) {
    return MOCK_USERS[mockUser];
  }
  
  // Check for actual GitHub session
  const githubUser = getSessionCookie('github_user');
  if (githubUser) {
    try {
      return JSON.parse(githubUser);
    } catch (error) {
      console.error('Error parsing GitHub user from cookie:', error);
      clearSessionCookie('github_user');
      return null;
    }
  }
  
  return null;
};

/**
 * Set current user session (for development mocking)
 * @param {string} username - Mock username
 */
export const setMockUser = (username) => {
  if (MOCK_USERS[username]) {
    setSessionCookie('mock_github_user', username);
    // Clear real GitHub user if set
    clearSessionCookie('github_user');
  } else {
    console.warn(`Mock user ${username} not found`);
  }
};

/**
 * Set GitHub user session from real authentication
 * @param {Object} user - GitHub user object
 */
export const setGitHubUser = (user) => {
  setSessionCookie('github_user', JSON.stringify(user));
  // Clear mock user if set
  clearSessionCookie('mock_github_user');
};

/**
 * Clear all user sessions
 */
export const clearUserSession = () => {
  clearSessionCookie('github_user');
  clearSessionCookie('mock_github_user');
};

/**
 * Check if we're in development mode
 * @returns {boolean}
 */
export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

/**
 * Get available mock users for development
 * @returns {Array} Array of mock user objects
 */
export const getMockUsers = () => {
  return Object.values(MOCK_USERS);
};