import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Leaderboard from './Leaderboard';
import ContributionChart from './ContributionChart';
import MockUserSelector from './MockUserSelector';
import { LeaderboardWithChartSkeleton } from './SkeletonLoaders';
import { fetchLeaderboard, filterLeaderboardForDisplay, formatChartDataFromFiltered } from '../api/leaderboard';
import { getCurrentUser } from '../utils/sessionUtils';

const LeaderboardSection = () => {
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
        
        const data = await fetchLeaderboard();
        
        // Sort by total edits descending
        const sortedData = [...data].sort((a, b) => b.totalEdits - a.totalEdits);
        setFullLeaderboardData(sortedData);
        
        // Get current user and update display
        const user = getCurrentUser();
        setCurrentUser(user);
        updateDisplayData(sortedData, user);
      } catch (err) {
        console.error('Error loading leaderboard data:', err);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboardData();
  }, [updateDisplayData]);

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
      
      <MockUserSelector onUserChange={handleUserChange} />
      
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