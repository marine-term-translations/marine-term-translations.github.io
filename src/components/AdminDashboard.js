import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
  Badge,
  Table,
  Form,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../services/apiService";
import RepositoryCreation from "./RepositoryCreation";

const AdminDashboard = () => {
  const { isAuthenticated, token, user, login, logout, exchangeCodeForToken } =
    useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orgMembers, setOrgMembers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

  const loadOrganizationData = React.useCallback(async () => {
    try {
      setLoadingMembers(true);

      // Load organization members and teams using backend API
      const [membersData, teamsData] = await Promise.all([
        apiService.getOrganizationMembers(token),
        apiService.getOrganizationTeams(token),
      ]);

      // For each member, get their team memberships from the teams data
      const membersWithTeams = membersData.map((member) => {
        // Find teams where this member is included
        const memberTeams = teamsData.filter(
          (team) =>
            team.members &&
            team.members.some((teamMember) => teamMember.login === member.login)
        );

        return {
          ...member,
          teams: memberTeams,
        };
      });

      setOrgMembers(membersWithTeams);
      setTeams(teamsData);
    } catch (error) {
      console.error("Error loading organization data:", error);
      setError("Failed to load organization data");
    } finally {
      setLoadingMembers(false);
    }
  }, [token]);

  const checkAdminStatus = React.useCallback(async () => {
    try {
      setLoading(true);

      // Try to load organization data - if successful, user has admin access
      // The backend endpoints will handle authorization validation
      await loadOrganizationData();
      setIsAdmin(true);
    } catch (error) {
      console.error("Error checking admin status:", error);
      if (error.response?.status === 404) {
        setError(
          "You are not a member of the marine-term-translations organization"
        );
      } else if (error.response?.status === 403) {
        setError(
          "You do not have permission to access organization information"
        );
      } else {
        setError("Failed to verify organization membership");
      }
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, [loadOrganizationData]);

  const handleOAuthCallback = React.useCallback(
    async (code) => {
      try {
        setLoading(true);
        await exchangeCodeForToken(code);
        // Remove code from URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } catch (error) {
        setError("Failed to authenticate with GitHub");
        setLoading(false);
      }
    },
    [exchangeCodeForToken]
  );

  useEffect(() => {
    if (isAuthenticated && token && user) {
      checkAdminStatus();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, token, user, checkAdminStatus]);

  useEffect(() => {
    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !isAuthenticated) {
      handleOAuthCallback(code);
    }
  }, [isAuthenticated, handleOAuthCallback]);

  const handleTeamMembershipChange = async (memberLogin, teamSlug, action) => {
    const actionKey = `${memberLogin}-${teamSlug}`;
    setActionLoading((prev) => ({ ...prev, [actionKey]: true }));

    try {
      if (action === "add") {
        await apiService.addUserToTeam(token, teamSlug, memberLogin);
      } else if (action === "remove") {
        await apiService.removeUserFromTeam(token, teamSlug, memberLogin);
      }

      // Reload organization data to reflect changes
      await loadOrganizationData();
    } catch (error) {
      console.error(`Error ${action}ing team membership:`, error);
      setError(`Failed to ${action} team membership`);
    } finally {
      setActionLoading((prev) => ({ ...prev, [actionKey]: false }));
    }
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      setError("Failed to initiate GitHub login");
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Body className="text-center">
                <Card.Title>Admin Dashboard</Card.Title>
                <Card.Text>
                  You need to sign in with GitHub to access the admin dashboard.
                </Card.Text>
                <Button variant="primary" onClick={handleLogin}>
                  Sign in with GitHub
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Alert variant="danger">
              <Alert.Heading>Access Denied</Alert.Heading>
              <p>{error}</p>
              <hr />
              <Button variant="outline-danger" onClick={logout}>
                Sign out
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!isAdmin) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Alert variant="warning">
              <Alert.Heading>Admin Access Required</Alert.Heading>
              <p>You must be an organization admin to access this page.</p>
              <p>
                Current user: <strong>{user?.login}</strong>
              </p>
              <hr />
              <Button variant="outline-warning" onClick={logout}>
                Sign out
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Admin Dashboard</h1>
            <div>
              <span className="me-3">
                Welcome, <strong>{user?.login}</strong>
              </span>
              <Button variant="outline-secondary" size="sm" onClick={logout}>
                Sign out
              </Button>
            </div>
          </div>

          {loadingMembers ? (
            <div className="text-center my-5">
              <Spinner animation="border" />
              <p>Loading organization data...</p>
            </div>
          ) : (
            <>
              <RepositoryCreation token={token} />

              <Card className="mb-4">
                <Card.Header>
                  <h4>Organization Overview</h4>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <h6>
                        Total Members:{" "}
                        <Badge bg="primary">{orgMembers.length}</Badge>
                      </h6>
                    </Col>
                    <Col md={6}>
                      <h6>
                        Total Teams: <Badge bg="info">{teams.length}</Badge>
                      </h6>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <h4>Organization Members & Team Assignments</h4>
                </Card.Header>
                <Card.Body>
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>Teams</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orgMembers.map((member) => (
                        <tr key={member.login}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={member.avatar_url}
                                alt={member.login}
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  objectFit: "cover",
                                  flexShrink: 0,
                                }}
                                className="rounded me-2"
                              />
                              <div>
                                <div>
                                  <strong>{member.login}</strong>
                                </div>
                                <small className="text-muted">
                                  <a
                                    href={member.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    GitHub Profile
                                  </a>
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            {member.teams.length > 0 ? (
                              member.teams.map((team) => (
                                <Badge
                                  key={team.slug}
                                  bg="secondary"
                                  className="me-1"
                                >
                                  {team.name}
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="p-0 ms-1"
                                    style={{
                                      color: "white",
                                      textDecoration: "none",
                                    }}
                                    onClick={() =>
                                      handleTeamMembershipChange(
                                        member.login,
                                        team.slug,
                                        "remove"
                                      )
                                    }
                                    disabled={
                                      actionLoading[
                                        `${member.login}-${team.slug}`
                                      ]
                                    }
                                  >
                                    ×
                                  </Button>
                                </Badge>
                              ))
                            ) : (
                              <span className="text-muted">No teams</span>
                            )}
                          </td>
                          <td>
                            <Form.Select
                              size="sm"
                              style={{ width: "200px" }}
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleTeamMembershipChange(
                                    member.login,
                                    e.target.value,
                                    "add"
                                  );
                                  e.target.value = "";
                                }
                              }}
                            >
                              <option value="">Add to team...</option>
                              {teams
                                .filter(
                                  (team) =>
                                    !member.teams.some(
                                      (memberTeam) =>
                                        memberTeam.slug === team.slug
                                    )
                                )
                                .map((team) => (
                                  <option key={team.slug} value={team.slug}>
                                    {team.name}
                                  </option>
                                ))}
                            </Form.Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
