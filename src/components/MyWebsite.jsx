import WebsiteNavbar from "./navigation/WebsiteNavbar";
import { Outlet } from "react-router-dom";

export default function MyWebsite() {
    return <div> 
        <WebsiteNavbar />
        <Outlet />
        </div>
        
}
