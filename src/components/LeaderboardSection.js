import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Leaderboard from './Leaderboard';
import ContributionChart from './ContributionChart';
import { LeaderboardWithChartSkeleton } from './SkeletonLoaders';
import { fetchLeaderboard, formatChartData } from '../api/leaderboard';

const LeaderboardSection = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchLeaderboard();
        
        // Sort by total edits descending
        const sortedData = [...data].sort((a, b) => b.totalEdits - a.totalEdits);
        
        setLeaderboardData(sortedData);
        setChartData(formatChartData(sortedData));
      } catch (err) {
        console.error('Error loading leaderboard data:', err);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboardData();
  }, []);

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
      
      <Row className="g-4">
        <Col lg={6}>
          <Leaderboard 
            data={leaderboardData} 
            title="Top Contributors"
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
        </small>
      </div>
    </Container>
  );
};

export default LeaderboardSection;