import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import "../imports/router";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "../imports/ui/App";
import SHMU from "../imports/ui/routes/shmu/shmu";
import Meteo from "../imports/ui/routes/meteo/meteo";
import HZS from "../imports/ui/routes/hzs/hzs";
import Navigation from "../imports/ui/Navigation";

Meteor.startup(() => {
    const rootElement = document.getElementById("react-root");
    render(<BrowserRouter>
        <Navigation />
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="shmu" element={<SHMU/>}/>
            <Route path="meteo" element={<Meteo/>}/>
            <Route path="hzs" element={<HZS/>}/>
        </Routes>
    </BrowserRouter>, rootElement);
});