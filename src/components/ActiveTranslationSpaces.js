import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const ActiveTranslationSpaces = () => {
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActiveSpaces = async () => {
            try {
                // For testing purposes, we'll add some mock data
                const useMockData = process.env.NODE_ENV === 'development';
                
                if (useMockData) {
                    // Mock data for testing
                    const mockRepos = [
                        {
                            name: 'P02-NL',
                            updated_at: '2024-01-15T10:30:00Z',
                            description: 'Dutch translation for P02 vocabulary collection',
                            html_url: 'https://github.com/marine-term-translations/P02-NL'
                        },
                        {
                            name: 'P02-FR',
                            updated_at: '2024-01-10T14:20:00Z',
                            description: 'French translation for P02 vocabulary collection',
                            html_url: 'https://github.com/marine-term-translations/P02-FR'
                        },
                        {
                            name: 'L05-DE',
                            updated_at: '2024-01-08T09:15:00Z',
                            description: 'German translation for L05 vocabulary collection',
                            html_url: 'https://github.com/marine-term-translations/L05-DE'
                        },
                        {
                            name: 'P01-ES',
                            updated_at: '2024-01-05T16:45:00Z',
                            description: 'Spanish translation for P01 vocabulary collection',
                            html_url: 'https://github.com/marine-term-translations/P01-ES'
                        }
                    ];
                    
                    setRepos(mockRepos);
                    setLoading(false);
                    setError(null);
                    return;
                }

                const owner = 'marine-term-translations';
                const response = await axios.get(`https://api.github.com/orgs/${owner}/repos`);
                
                // Filter repositories following the convention: <VocabularyName>-<LanguageCode>
                // Looking for repositories with "-" and ending with 2-letter language code
                const activeRepos = response.data
                    .filter(repo => {
                        const name = repo.name;
                        // Must contain at least one hyphen
                        if (!name.includes('-')) return false;
                        
                        // Get the part after the last hyphen
                        const parts = name.split('-');
                        const lastPart = parts[parts.length - 1];
                        
                        // Check if it's a 2-letter language code (basic validation)
                        return lastPart.length === 2 && /^[A-Z]{2}$/i.test(lastPart);
                    })
                    .map(repo => ({
                        name: repo.name,
                        updated_at: repo.updated_at,
                        description: repo.description,
                        html_url: repo.html_url
                    }))
                    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)); // Sort by latest update

                setRepos(activeRepos);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error fetching active translation spaces:', error);
                setLoading(false);
                setError('Failed to fetch active translation spaces.');
            }
        };

        fetchActiveSpaces();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" />
                <p>Loading active translation spaces...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h2 className="mb-4">Active Translation Spaces</h2>
                    {repos.length > 0 ? (
                        <Row>
                            {repos.map((repo, index) => (
                                <Col md={6} lg={4} key={index} className="mb-4">
                                    <Card className="h-100">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>{repo.name}</Card.Title>
                                            {repo.description && (
                                                <Card.Text className="text-muted small">
                                                    {repo.description}
                                                </Card.Text>
                                            )}
                                            <Card.Text className="text-muted small mt-auto">
                                                Last updated: {formatDate(repo.updated_at)}
                                            </Card.Text>
                                            <div className="mt-2">
                                                <Card.Link 
                                                    href={`#/${repo.name}`}
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    View Translation
                                                </Card.Link>
                                                <Card.Link 
                                                    href={repo.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-outline-secondary btn-sm ms-2"
                                                >
                                                    GitHub
                                                </Card.Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Alert variant="info">
                            No active translation spaces found. Translation repositories should follow the naming convention: VocabularyName-LanguageCode (e.g., P02-NL, P02-FR).
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ActiveTranslationSpaces;