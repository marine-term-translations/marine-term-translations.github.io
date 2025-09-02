import React from 'react';
import { Container, Row, Col, Alert, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../i18n';

const LanguageNotSupported = () => {
  const { t } = useTranslation();

  const handleLanguageChange = (lng) => {
    window.location.hash = lng === 'en' ? '#/' : `#/${lng}/`;
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <Alert variant="warning" className="mb-3">
                  {t('languageNotSupported.title')}
                </Alert>
              </Card.Title>
              
              <Card.Text className="mb-4">
                {t('languageNotSupported.message')}
              </Card.Text>
              
              <Card.Text className="mb-4">
                {t('languageNotSupported.explanation')}
              </Card.Text>
              
              <hr />
              
              <h5>{t('languageNotSupported.contactTitle')}</h5>
              <Card.Text className="mb-3">
                {t('languageNotSupported.contactMessage')}
              </Card.Text>
              <Card.Text className="mb-4">
                <strong>
                  <a href="mailto:opsci@vliz.be">{t('languageNotSupported.contactEmail')}</a>
                </strong>
              </Card.Text>
              
              <hr />
              
              <h5>{t('languageNotSupported.communityTitle')}</h5>
              <Card.Text className="mb-4">
                {t('languageNotSupported.communityMessage')}
              </Card.Text>
              
              <hr />
              
              <h5>{t('languageNotSupported.availableLanguages')}</h5>
              <div className="d-flex gap-2 mt-3">
                {supportedLanguages.map((lng) => (
                  <Button
                    key={lng}
                    variant="outline-primary"
                    onClick={() => handleLanguageChange(lng)}
                  >
                    {t(`languageNotSupported.${lng === 'en' ? 'english' : lng === 'fr' ? 'french' : 'dutch'}`)}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LanguageNotSupported;