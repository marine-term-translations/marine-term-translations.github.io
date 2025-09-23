import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import Leaderboard from './Leaderboard';
import ContributionChart from './ContributionChart';
import MockUserSelector from './MockUserSelector';
import { LeaderboardWithChartSkeleton } from './SkeletonLoaders';
import { fetchLeaderboard, fetchLeaderboardAuthenticated, filterLeaderboardForDisplay, formatChartDataFromFiltered } from '../api/leaderboard';
import { getCurrentUser } from '../utils/sessionUtils';
import { useAuth } from '../contexts/AuthContext';

const LeaderboardSection = () => {
  const { isAuthenticated, user: authUser, token, login } = useAuth();
  const [fullLeaderboardData, setFullLeaderboardData] = useState([]);
  const [displayLeaderboardData, setDisplayLeaderboardData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateDisplayData = React.useCallback((fullData, user) => {
    // Filter data for display (top 5 + current user if not in top 5)
    const filteredData = filterLeaderboardForDisplay(fullData, user);
    setDisplayLeaderboardData(filteredData);
    
    // Format chart data from filtered data
    const chartData = formatChartDataFromFiltered(filteredData);
    setChartData(chartData);
  }, []);

  useEffect(() => {
    const loadLeaderboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data;
        if (isAuthenticated && token) {
          // Use authenticated API call
          data = await fetchLeaderboardAuthenticated(token);
          setCurrentUser(authUser);
        } else {
          // Use mock data for development/unauthenticated state
          data = await fetchLeaderboard();
          // Get current mock user for development
          const user = getCurrentUser();
          setCurrentUser(user);
        }
        
        // Sort by total edits descending
        const sortedData = [...data].sort((a, b) => b.totalEdits - a.totalEdits);
        setFullLeaderboardData(sortedData);
        
        // Update display data
        const user = isAuthenticated ? authUser : getCurrentUser();
        updateDisplayData(sortedData, user);
      } catch (err) {
        console.error('Error loading leaderboard data:', err);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboardData();
  }, [updateDisplayData, isAuthenticated, token, authUser]);

  const handleUserChange = (user) => {
    setCurrentUser(user);
    updateDisplayData(fullLeaderboardData, user);
  };

  if (loading) {
    return (
      <Container>
        <LeaderboardWithChartSkeleton />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <div className="text-center text-danger">
          <h3>❌ {error}</h3>
          <p>Please try refreshing the page</p>
        </div>
      </Container>
    );
  }

  // Show login prompt when user is not authenticated
  if (!isAuthenticated) {
    return (
      <Container className="my-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary mb-3">
            🏆 Contribution Leaderboard
          </h2>
          <p className="lead text-muted">
            Celebrating our amazing contributors and their impact across marine translation projects
          </p>
        </div>
        
        <div className="text-center py-5">
          <div className="mb-4">
            <div className="display-1 mb-3">🔐</div>
            <h3 className="mb-3">Login Required</h3>
            <p className="lead text-muted mb-4">
              Sign in with GitHub to view the contribution leaderboard and see how you rank among marine translation contributors.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={login}
              className="px-4 py-2"
              style={{
                backgroundColor: '#0066cc',
                borderColor: '#0066cc',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 8px rgba(0,102,204,0.3)'
              }}
            >
              🔑 Login with GitHub
            </Button>
          </div>
          
          {/* Show development mode features when not authenticated */}
          <MockUserSelector onUserChange={handleUserChange} />
          
          {/* Show mock leaderboard data for preview */}
          {!loading && fullLeaderboardData.length > 0 && (
            <div className="mt-5">
              <Alert variant="info" className="mb-4">
                <strong>Preview Mode:</strong> This shows sample data. Login to see real contribution data.
              </Alert>
              <Row className="g-4">
                <Col lg={6}>
                  <Leaderboard 
                    data={displayLeaderboardData} 
                    title="Sample Contributors"
                    currentUser={currentUser}
                  />
                </Col>
                <Col lg={6}>
                  <ContributionChart 
                    data={chartData} 
                    title="Sample Contributions"
                  />
                </Col>
              </Row>
            </div>
          )}
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold text-primary mb-3">
          🏆 Contribution Leaderboard
        </h2>
        <p className="lead text-muted">
          Celebrating our amazing contributors and their impact across marine translation projects
        </p>
      </div>
      
      {/* Only show mock user selector in development mode when authenticated */}
      {process.env.NODE_ENV === 'development' && (
        <MockUserSelector onUserChange={handleUserChange} />
      )}
      
      <Row className="g-4">
        <Col lg={6}>
          <Leaderboard 
            data={displayLeaderboardData} 
            title="Top Contributors"
            currentUser={currentUser}
          />
        </Col>
        <Col lg={6}>
          <ContributionChart 
            data={chartData} 
            title="Contributions Overview"
          />
        </Col>
      </Row>
      
      <div className="text-center mt-4">
        <small className="text-muted">
          🔄 Data refreshes automatically • Last updated: {new Date().toLocaleDateString()}
          {currentUser && (
            <span className="ms-2">• Showing personalized view for @{currentUser.login}</span>
          )}
        </small>
      </div>
    </Container>
  );
};

export default LeaderboardSection;