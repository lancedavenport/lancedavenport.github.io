import { BrowserRouter, Route, Routes } from "react-router-dom";

import MyWebsite from "../MyWebsite";
import MyLanding from "./pages/MyLanding";
import AboutMe from "./pages/AboutMe";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

export default function WebsiteRouter() {
    return  <BrowserRouter>
            <Routes>
                <Route path="/" element={<MyWebsite />}>
                    <Route index element={<MyLanding />} />
                    <Route path="/about" element={<AboutMe/>}/>
                    <Route path="/projects" element={<Projects/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    }