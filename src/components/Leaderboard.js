import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const Leaderboard = ({ data = [], title = "Top Contributors" }) => {
  const getRankEmoji = (index) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  const getRankBadgeVariant = (index) => {
    switch (index) {
      case 0: return 'warning'; // Gold
      case 1: return 'light'; // Silver
      case 2: return 'secondary'; // Bronze
      default: return 'primary';
    }
  };

  const getTopProject = (projects) => {
    const entries = Object.entries(projects);
    if (entries.length === 0) return { name: 'N/A', edits: 0 };
    
    const topEntry = entries.reduce((max, current) => 
      current[1] > max[1] ? current : max
    );
    return { name: topEntry[0], edits: topEntry[1] };
  };

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Header 
        className="text-white border-0"
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        }}
      >
        <h5 className="mb-0 d-flex align-items-center">
          🏆 {title}
        </h5>
      </Card.Header>
      <Card.Body className="p-0">
        {data.length > 0 ? (
          <div>
            {data.map((user, index) => {
              const topProject = getTopProject(user.projects);
              const isTopThree = index < 3;
              
              return (
                <div 
                  key={user.userId} 
                  className={`d-flex align-items-center p-3 border-bottom ${
                    isTopThree ? 'bg-light' : ''
                  } ${index === data.length - 1 ? 'border-0' : ''}`}
                  style={{
                    transition: 'background-color 0.2s ease',
                    ...(isTopThree && {
                      background: index === 0 ? 'linear-gradient(135deg, #fff7e6 0%, #fff4d6 100%)' :
                                 index === 1 ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' :
                                              'linear-gradient(135deg, #fdf2e9 0%, #f8f5f0 100%)'
                    })
                  }}
                >
                  <div className="me-3">
                    <Badge 
                      bg={getRankBadgeVariant(index)}
                      className="fs-6 p-2 rounded-circle d-flex align-items-center justify-content-center"
                      style={{ 
                        minWidth: '40px', 
                        minHeight: '40px',
                        fontWeight: 'bold'
                      }}
                    >
                      {getRankEmoji(index)}
                    </Badge>
                  </div>
                  
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center mb-1">
                      <strong className="text-primary me-2">
                        @{user.userId}
                      </strong>
                      {isTopThree && (
                        <Badge bg="success" className="small">
                          Top {index + 1}
                        </Badge>
                      )}
                    </div>
                    <div className="small text-muted">
                      <span className="me-2">
                        🎯 Top project: <strong>{topProject.name}</strong> ({topProject.edits} edits)
                      </span>
                      <br />
                      <span>
                        📊 {Object.keys(user.projects).length} project{Object.keys(user.projects).length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-end">
                    <Badge 
                      bg="primary" 
                      className="fs-6 px-3 py-2 rounded-pill"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      }}
                    >
                      {user.totalEdits} edits
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-muted py-5">
            <div className="display-1 mb-3">🏆</div>
            <h5>No Contributors Yet</h5>
            <p>Leaderboard will appear when data is available</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Leaderboard;