import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function WebsiteNavbar() {
    return (
        <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="nav-link">About Me</Nav.Link>
                        <Nav.Link as={Link} to="/projects" className="nav-link">Projects</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
