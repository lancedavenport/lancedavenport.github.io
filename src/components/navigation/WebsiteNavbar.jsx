import { Link } from "react-router-dom";
import logo from "../../assets/my_logo.png";
import "../../styles/Navbar.css"; 

export default function WebsiteNavbar() {
  return (
    <nav className="navbar navbar-dark bg-dark sticky-top navbar-expand-sm">
      <div className="container">
        <Link to="/" className="navbar-brand nav-icon logo-left">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </Link>
        <div className="navbar-collapse" id="responsive-navbar-nav">
          <div className="nav ml-auto justify-end align-right gap-8">
            <Link to="/" className="nav-link">HOME</Link>
            <Link to="/about" className="nav-link">ABOUT</Link>
            <Link to="/projects" className="nav-link">PROJECTS</Link>
            <a href="mailto:lance.davenport@icloud.com" className="nav-link">CONTACT</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
