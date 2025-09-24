import React from "react";
import { Container, Button } from "react-bootstrap";
import SEOHelmet from "../components/SEOHelmet";
import MarckdownViewer from "../components/MarckdownViewer";
import ActiveTranslationSpaces from "../components/ActiveTranslationSpaces";
//import LeaderboardSection from "../components/LeaderboardSection";

const HomePage = () => {
  return (
    <>
      <SEOHelmet
        title="Marine Term Translations - Home"
        description="Discover comprehensive marine terminology translations across multiple languages. Access active translation spaces, contribute to marine vocabulary databases, and explore maritime documentation."
        keywords="marine translation, maritime terminology, ocean vocabulary, nautical terms, multilingual marine dictionary, sea terminology, marine translation platform"
        url="/"
        type="website"
      />
      <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/marine-term-translations.github.io/main/siteInfo.md" />

      {/* Call-to-Action Section */}
      <Container className="text-center my-4">
        <Button
          href="mailto:opsci@vliz.be?subject=Add%20to%20organization&body=Please%20add%20this%20user%20to%20the%20organization."
          variant="primary"
          size="lg"
          className="px-4 py-2"
          style={{
            backgroundColor: "#0066cc",
            borderColor: "#0066cc",
            fontSize: "1.2rem",
            fontWeight: "bold",
            boxShadow: "0 4px 8px rgba(0,102,204,0.3)",
          }}
        >
          🌊 Sign me up as translator
        </Button>
      </Container>

      <ActiveTranslationSpaces />
      {/* <LeaderboardSection /> */}
    </>
  );
};

export default HomePage;
