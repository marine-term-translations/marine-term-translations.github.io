import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner, Row, Col, InputGroup } from 'react-bootstrap';
import { vocabularies, extractVocabTag } from '../data/vocabularies';
import { iso639_1Languages } from '../data/languages';
import apiService from '../services/apiService';

const RepositoryCreation = ({ token }) => {
  const [selectedVocab, setSelectedVocab] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Filter vocabularies based on search term
  const filteredVocabularies = vocabularies.filter(vocab => 
    vocab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vocab.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vocab.collectionUri.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateRepository = async (e) => {
    e.preventDefault();
    
    if (!selectedVocab || !selectedLanguage) {
      setError('Please select both a vocabulary and a language');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Find the selected vocabulary
      const vocab = vocabularies.find(v => v.collectionUri === selectedVocab);
      if (!vocab) {
        throw new Error('Selected vocabulary not found');
      }

      // Extract vocab tag from URI
      const vocabTag = extractVocabTag(vocab.collectionUri);
      if (!vocabTag) {
        throw new Error('Could not extract vocabulary tag from URI');
      }

      // Call backend API to create repository
      const result = await apiService.createRepository(token, vocabTag, selectedLanguage);
      
      // Show success message with link
      setSuccess({
        message: `Repository created successfully!`,
        repositoryUrl: result.html_url || `https://github.com/marine-term-translations/${vocabTag}-${selectedLanguage.toUpperCase()}`,
        repositoryName: `${vocabTag}-${selectedLanguage.toUpperCase()}`
      });

      // Reset form
      setSelectedVocab('');
      setSelectedLanguage('');
      setSearchTerm('');

    } catch (error) {
      console.error('Error creating repository:', error);
      setError(error.response?.data?.message || error.message || 'Failed to create repository');
    } finally {
      setLoading(false);
    }
  };

  const selectedVocabDetails = vocabularies.find(v => v.collectionUri === selectedVocab);

  return (
    <Card className="mb-4">
      <Card.Header>
        <h4>Create Translation Repository</h4>
      </Card.Header>
      <Card.Body>
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
            <Alert.Heading>Repository Created Successfully!</Alert.Heading>
            <p>{success.message}</p>
            <p>
              <strong>Repository:</strong> {success.repositoryName}<br/>
              <a 
                href={success.repositoryUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline-success btn-sm"
              >
                View Repository on GitHub
              </a>
            </p>
          </Alert>
        )}

        <Form onSubmit={handleCreateRepository}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Search and Select Vocabulary</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search vocabularies by title, description, or URI..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
                <Form.Select
                  value={selectedVocab}
                  onChange={(e) => setSelectedVocab(e.target.value)}
                  className="mt-2"
                  size="sm"
                  style={{ maxHeight: '200px', overflowY: 'auto' }}
                >
                  <option value="">Select a vocabulary...</option>
                  {filteredVocabularies.map((vocab) => {
                    const tag = extractVocabTag(vocab.collectionUri);
                    return (
                      <option key={vocab.collectionUri} value={vocab.collectionUri}>
                        {tag} - {vocab.title}
                      </option>
                    );
                  })}
                </Form.Select>
                {selectedVocabDetails && (
                  <Form.Text className="text-muted mt-2 d-block">
                    <strong>Selected:</strong> {selectedVocabDetails.description}
                    <br/>
                    <strong>URI:</strong> {selectedVocabDetails.collectionUri}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Language (ISO 639-1)</Form.Label>
                <Form.Select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="">Select a language...</option>
                  {iso639_1Languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.code.toUpperCase()} - {lang.name}
                    </option>
                  ))}
                </Form.Select>
                {selectedLanguage && (
                  <Form.Text className="text-muted">
                    Repository will be named: {selectedVocabDetails ? extractVocabTag(selectedVocabDetails.collectionUri) : '[vocab]'}-{selectedLanguage.toUpperCase()}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Button 
            type="submit" 
            variant="primary" 
            disabled={loading || !selectedVocab || !selectedLanguage}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Creating Repository...
              </>
            ) : (
              'Create Repository'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RepositoryCreation;