# Leaderboard Feature and Authentication Integration

This document describes the implementation of the leaderboard feature with authentication integration.

## Overview

The leaderboard feature displays user rankings by fetching data from a backend API endpoint (`/leaderboard`) that requires an authentication token. The homepage dynamically updates based on the user's login status.

## Implementation Details

### Authentication States

#### When User is NOT Authenticated:
- **NavBar**: Shows "🔑 Login" button in the top right corner
- **Leaderboard**: Shows login prompt with "🔑 Login with GitHub" button
- **Preview Mode**: Shows sample leaderboard data below the login prompt for demonstration
- **Development**: Mock user selector is available for testing

#### When User IS Authenticated:
- **NavBar**: Shows user avatar and name dropdown with logout option
- **Leaderboard**: Fetches real data from `/leaderboard` API endpoint with auth token
- **Development**: Mock user selector is hidden in production, shown in development mode

### API Integration

The leaderboard uses two different data fetching strategies:

1. **Unauthenticated**: `fetchLeaderboard()` - Returns mock data for preview
2. **Authenticated**: `fetchLeaderboardAuthenticated(token)` - Calls backend API with auth token

### Backend API Endpoint

When the backend is ready, the authenticated leaderboard will call:
```
GET /leaderboard
Authorization: Bearer {token}
```

Expected response format:
```json
{
  "leaderboard": [
    {
      "userId": "username",
      "totalEdits": 128,
      "projects": {
        "project-A": 50,
        "project-B": 78
      }
    }
  ]
}
```

### Components Modified

1. **LeaderboardSection.js**:
   - Integrated with AuthContext
   - Conditional rendering based on authentication state
   - API integration for authenticated users

2. **NavBar.js**:
   - Added user authentication state display
   - User avatar dropdown when authenticated
   - Login button when not authenticated

3. **leaderboard.js (API)**:
   - Added `fetchLeaderboardAuthenticated()` function
   - Integrated with apiService for backend calls

4. **apiService.js**:
   - Added `getLeaderboard(token)` method
   - Proper authentication headers handling

### Development and Testing

The implementation preserves all existing development functionality:
- Mock user selector for testing filtering
- Sample data for preview when not authenticated
- Development mode indicators

### Production Deployment

When deploying to production:
1. Ensure backend API is available at the configured endpoint
2. The `/leaderboard` endpoint should be implemented to return user contribution data
3. Mock user selector will be hidden automatically
4. Real GitHub OAuth authentication will be used

## Usage

Users can:
1. View sample leaderboard data without authentication
2. Click "Login with GitHub" to authenticate
3. See personalized leaderboard with their ranking after login
4. Logout using the user dropdown in the navbar

The feature gracefully handles both authenticated and unauthenticated states, providing a seamless user experience.