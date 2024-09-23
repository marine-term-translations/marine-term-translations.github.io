import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {


    return(
        <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
            <Container>
                <Navbar.Brand href="#">Marine Term Translations</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <NavDropdown title="Translater" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#list">List of repository</NavDropdown.Item>
                            <NavDropdown.Item href="#about">About the use of translate site</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Developer" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#front">Front-End's information</NavDropdown.Item>
                            <NavDropdown.Item href="#back">Back-End's information</NavDropdown.Item>
                            <NavDropdown.Item href="#gh_action">GitHub action's information</NavDropdown.Item>
                            <NavDropdown.Item href="#general">General page information</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Administrator" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#instruction">Instruction for repository</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;