import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup, Spinner, Alert, Form } from 'react-bootstrap';
import axios from 'axios';

const ListRepo = () => {
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRepo = async () => {
            try {
                const owner = 'marine-term-translations';
                const response = await axios.get(`https://api.github.com/orgs/${owner}/repos`);
                
                const repos = response.data
                    .filter(repo => repo.name.includes('Repo') || repo.name.includes('Front'))
                    .map(repo => ({ name: repo.name }));

                setRepos(repos);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error fetching list of repositories:', error);
                setLoading(false);
                setError('Failed to fetch the list of repositories.');
            }
        };

        fetchRepo();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredRepos = repos.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p>Loading...</p>
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
                    <h1>List of Translate Sites</h1>
                    <Form className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Search repositories"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Form>

                    <ListGroup>
                        {filteredRepos.length > 0 ? (
                            filteredRepos.map((repo, index) => (
                                <ListGroup.Item key={index}>
                                    <a href={`https://marine-term-translations.github.io/${repo.name}`}>
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
