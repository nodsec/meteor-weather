import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from "./App";
import SHMU from "./routes/shmu/shmu";
import Meteo from "./routes/meteo/meteo";
import HZS from "./routes/hzs/hzs";

const Router = props => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="shmu" element={<SHMU />} />
                <Route path="meteo" element={<Meteo />} />
                <Route path="hzs" element={<HZS />} />
            </Route>
        </Routes>
    )
}

export default Router;