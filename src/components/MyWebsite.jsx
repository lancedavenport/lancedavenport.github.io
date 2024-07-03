import { Col, Container, Row } from "react-bootstrap";
import WebsiteNavbar from "./navigation/WebsiteNavbar";
import { Outlet } from "react-router-dom";
import './App.css';

export default function MyWebsite() {
    return <div> 
        <WebsiteNavbar />
        <Outlet />
        </div>
        
}
