import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const LeaderboardSkeleton = () => {
  // Create skeleton items for top contributors
  const skeletonItems = Array.from({ length: 5 }, (_, index) => (
    <div key={index} className="d-flex align-items-center mb-3 p-3 border rounded">
      <div 
        className="skeleton-rank me-3"
        style={{
          width: '30px',
          height: '30px',
          backgroundColor: '#e9ecef',
          borderRadius: '50%'
        }}
      ></div>
      <div className="flex-grow-1">
        <div 
          className="skeleton-name mb-2"
          style={{
            height: '18px',
            width: '120px',
            backgroundColor: '#e9ecef',
            borderRadius: '4px'
          }}
        ></div>
        <div 
          className="skeleton-stats"
          style={{
            height: '14px',
            width: '200px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px'
          }}
        ></div>
      </div>
      <div 
        className="skeleton-edits"
        style={{
          width: '60px',
          height: '24px',
          backgroundColor: '#e9ecef',
          borderRadius: '12px'
        }}
      ></div>
    </div>
  ));

  return (
    <Card className="h-100">
      <Card.Header className="bg-gradient-primary text-white">
        <div 
          className="skeleton-title"
          style={{
            height: '20px',
            width: '150px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '4px'
          }}
        ></div>
      </Card.Header>
      <Card.Body>
        {skeletonItems}
      </Card.Body>
    </Card>
  );
};

const ChartSkeleton = () => {
  return (
    <Card className="h-100">
      <Card.Header>
        <div 
          className="skeleton-title"
          style={{
            height: '20px',
            width: '200px',
            backgroundColor: '#e9ecef',
            borderRadius: '4px'
          }}
        ></div>
      </Card.Header>
      <Card.Body>
        <div 
          className="skeleton-chart"
          style={{
            height: '300px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="text-muted">
            Loading chart...
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

// Main skeleton component that combines both
const LeaderboardWithChartSkeleton = () => {
  return (
    <div className="my-5">
      <div 
        className="skeleton-section-title mb-4"
        style={{
          height: '32px',
          width: '300px',
          backgroundColor: '#e9ecef',
          borderRadius: '4px'
        }}
      ></div>
      <Row>
        <Col lg={6} className="mb-4">
          <LeaderboardSkeleton />
        </Col>
        <Col lg={6} className="mb-4">
          <ChartSkeleton />
        </Col>
      </Row>
    </div>
  );
};

export { LeaderboardSkeleton, ChartSkeleton, LeaderboardWithChartSkeleton };