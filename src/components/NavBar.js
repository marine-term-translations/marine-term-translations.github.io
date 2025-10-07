import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  Image,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, login, logout } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand href="#">{t("navigation.brand")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <NavDropdown
              title={t("navigation.translator")}
              id="translator-nav-dropdown"
            >
              <NavDropdown.Item href="#about">
                {t("navigation.aboutUse")}
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={t("navigation.developer")}
              id="developer-nav-dropdown"
            >
              <NavDropdown.Item href="#front">
                {t("navigation.frontEnd")}
              </NavDropdown.Item>
              <NavDropdown.Item href="#back">
                {t("navigation.backEnd")}
              </NavDropdown.Item>
              <NavDropdown.Item href="#gh_action">
                {t("navigation.ghAction")}
              </NavDropdown.Item>
              <NavDropdown.Item href="#general">
                {t("navigation.general")}
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={t("navigation.administrator")}
              id="administrator-nav-dropdown"
            >
              <NavDropdown.Item href="#instruction">
                {t("navigation.instruction")}
              </NavDropdown.Item>
              <NavDropdown.Item href="#admin-dashboard">
                {t("navigation.adminDashboard")}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Button
              variant="outline-primary"
              size="sm"
              href="https://github.com/marine-term-translations/marine-term-translations.github.io/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="me-2"
              title={t("navigation.reportIssue")}
            >
              🐛 {t("navigation.reportIssue")}
            </Button>
            <LanguageSwitcher />
            {isAuthenticated ? (
              <NavDropdown
                title={
                  <div className="d-flex align-items-center">
                    <Image
                      src={user?.avatar_url}
                      alt={user?.name || user?.login}
                      style={{
                        objectFit: "cover",
                        width: "32px",
                        height: "32px",
                      }}
                      roundedCircle
                      className="me-2"
                      onError={(e) => {
                        e.target.src = `https://github.com/identicons/${
                          user?.login || "user"
                        }.png`;
                      }}
                    />
                    <span className="d-none d-sm-inline">
                      {user?.name || user?.login}
                    </span>
                  </div>
                }
                id="user-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item>
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "8px", width: "24px" }}
                  >
                    <Image
                      src={user?.avatar_url}
                      alt={user?.name || user?.login}
                      roundedCircle
                      className="me-2"
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <div className="fw-bold">{user?.name || user?.login}</div>
                      <small className="text-muted">@{user?.login}</small>
                    </div>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  🚪 Sign out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={login}
                className="ms-2"
              >
                🔑 Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
