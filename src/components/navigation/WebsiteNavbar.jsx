import { NavLink } from "react-router-dom";
import logo from "../../assets/my_logo.png";
import "../../styles/Navbar.css"; 

export default function WebsiteNavbar() {
  return (
    <nav className="navbar navbar-dark bg-dark sticky-top navbar-expand-sm">
      <div className="container">
        <NavLink to="/" className="navbar-brand nav-icon logo-left">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </NavLink>
        <div className="navbar-collapse" id="responsive-navbar-nav">
          <div className="nav ml-auto justify-end align-right gap-8">
            <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>HOME</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>ABOUT</NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>PROJECTS</NavLink>
            <a href="mailto:lance.davenport@icloud.com" className="nav-link">CONTACT</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
