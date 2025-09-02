import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const NavBar = () => {
    const { t } = useTranslation();

    return(
        <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
            <Container>
                <Navbar.Brand href="#">{t('navigation.brand')}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <NavDropdown title={t('navigation.translator')} id="translator-nav-dropdown">
                            <NavDropdown.Item href="#list">{t('navigation.listRepo')}</NavDropdown.Item>
                            <NavDropdown.Item href="#about">{t('navigation.aboutUse')}</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={t('navigation.developer')} id="developer-nav-dropdown">
                            <NavDropdown.Item href="#front">{t('navigation.frontEnd')}</NavDropdown.Item>
                            <NavDropdown.Item href="#back">{t('navigation.backEnd')}</NavDropdown.Item>
                            <NavDropdown.Item href="#gh_action">{t('navigation.ghAction')}</NavDropdown.Item>
                            <NavDropdown.Item href="#general">{t('navigation.general')}</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={t('navigation.administrator')} id="administrator-nav-dropdown">
                            <NavDropdown.Item href="#instruction">{t('navigation.instruction')}</NavDropdown.Item>
                            <NavDropdown.Item href="#admin-dashboard">{t('navigation.adminDashboard')}</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="ms-auto">
                        <LanguageSwitcher />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;