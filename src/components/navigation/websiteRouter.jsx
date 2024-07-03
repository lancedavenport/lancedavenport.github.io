import { BrowserRouter, Route, Routes } from "react-router-dom";

import MyWebsite from "../MyWebsite";
import MyLanding from "./pages/MyLanding";
import AboutMe from "./pages/AboutMe";

export default function WebsiteRouter() {
    return  <BrowserRouter>
            <Routes>
                <Route path="/" element={<MyWebsite />}>
                    <Route index element={<MyLanding />} />
                    <Route path="/about" element={<AboutMe/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    }