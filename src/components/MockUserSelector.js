import React from 'react';
import { Card, Button, ButtonGroup, Badge, Alert } from 'react-bootstrap';
import { setMockUser, clearUserSession, getCurrentUser, isDevelopment, getMockUsers } from '../utils/sessionUtils';

const MockUserSelector = ({ onUserChange }) => {
  const [currentUser, setCurrentUser] = React.useState(getCurrentUser());
  const mockUsers = getMockUsers();

  // Don't show in production
  if (!isDevelopment()) {
    return null;
  }

  const handleMockUserSelect = (username) => {
    setMockUser(username);
    const newUser = getCurrentUser();
    setCurrentUser(newUser);
    if (onUserChange) {
      onUserChange(newUser);
    }
  };

  const handleClearUser = () => {
    clearUserSession();
    setCurrentUser(null);
    if (onUserChange) {
      onUserChange(null);
    }
  };

  return (
    <Card className="mb-4 border-warning">
      <Card.Header className="bg-warning text-dark">
        <h6 className="mb-0">🧪 Development: Mock GitHub User</h6>
      </Card.Header>
      <Card.Body>
        <Alert variant="info" className="small mb-3">
          <strong>Development Mode:</strong> Select a mock user to test the leaderboard filtering functionality.
          In production, this will work with real GitHub authentication.
        </Alert>
        
        <div className="mb-3">
          <strong>Current User: </strong>
          {currentUser ? (
            <Badge bg="success">@{currentUser.login}</Badge>
          ) : (
            <Badge bg="secondary">Not logged in</Badge>
          )}
        </div>

        <div className="mb-3">
          <strong>Select Mock User:</strong>
          <ButtonGroup className="w-100 mt-2 flex-wrap">
            {mockUsers.slice(0, 6).map(user => (
              <Button 
                key={user.login}
                variant={currentUser?.login === user.login ? 'primary' : 'outline-primary'}
                size="sm"
                className="mb-1"
                onClick={() => handleMockUserSelect(user.login)}
              >
                @{user.login}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <div className="mb-2">
          <ButtonGroup className="w-100 flex-wrap">
            {mockUsers.slice(6).map(user => (
              <Button 
                key={user.login}
                variant={currentUser?.login === user.login ? 'primary' : 'outline-primary'}
                size="sm"
                className="mb-1"
                onClick={() => handleMockUserSelect(user.login)}
              >
                @{user.login}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <Button 
          variant="outline-secondary" 
          size="sm" 
          onClick={handleClearUser}
          className="w-100"
        >
          Clear User (Log Out)
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MockUserSelector;