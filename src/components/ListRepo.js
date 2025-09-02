import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup, Spinner, Alert, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const ListRepo = () => {
    const { t } = useTranslation();
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRepo = async () => {
            try {
                // For testing purposes, we'll add some mock data
                const useMockData = process.env.NODE_ENV === 'development';
                
                if (useMockData) {
                    // Mock data for testing - same as ActiveTranslationSpaces
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
                    ].map(repo => ({ name: repo.name })); // Keep the existing structure for now
                    
                    setRepos(mockRepos);
                    setLoading(false);
                    setError(null);
                    return;
                }

                const owner = 'marine-term-translations';
                const response = await axios.get(`https://api.github.com/orgs/${owner}/repos`);
                
                // Updated filtering logic based on the new requirements
                // Look for repositories with "-" and language code pattern
                const repos = response.data
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
                    .map(repo => ({ name: repo.name }));

                setRepos(repos);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error fetching list of repositories:', error);
                setLoading(false);
                setError(t('pages.failedToFetch'));
            }
        };

        fetchRepo();
    }, [t]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredRepos = repos.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <Container className="text-center m-5">
                <Spinner animation="border" />
                <p>{t('pages.loading')}</p>
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
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1>{t('pages.activeTranslationSpaces')}</h1>
                    <Form className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder={t('pages.searchRepositories')}
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Form>

                    <ListGroup>
                        {filteredRepos.length > 0 ? (
                            filteredRepos.map((repo, index) => (
                                <ListGroup.Item key={index}>
                                    <a href={`#/${repo.name}`}>
                                        {repo.name}
                                    </a>
                                </ListGroup.Item>
                            ))
                        ) : (
                            <p>No repositories found</p>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ListRepo;