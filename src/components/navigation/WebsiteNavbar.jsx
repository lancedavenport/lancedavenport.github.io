import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/my_logo.png";

export default function WebsiteNavbar() {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav">
        <Navbar.Brand as={Link} to="/" className="nav-icon logo-left">
          <img
            alt=""
            src={logo}
            width="17"
            height="17"
            className="d-inline-block align-top"
          ></img>
        </Navbar.Brand>
          <Nav className="justify-end align-center gap-8 hidden lg:flex">
            <Nav.Link as={Link} to="/" className="nav-link">HOME</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link">ABOUT ME</Nav.Link>
            <Nav.Link as={Link} to="/projects" className="nav-link">PROJECTS</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link">CONTACT</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}