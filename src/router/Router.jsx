

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/"  element={<Home/>}/>
                <Route path="about"  element={<About/>}/>

                <Route path="*"  element={<NotFound/>}/>
            </Routes>
        </div>
    );
};

export default Router;