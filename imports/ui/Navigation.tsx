import React from "react";
import {BrowserRouter, Link} from "react-router-dom";

const Navigation = props => {
    return (<nav style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem"
    }}>
            <Link to="/">Home</Link> |{" "}
            <Link to="/shmu">SHMU</Link> |{" "}
            <Link to="/meteo">Meteo</Link>
    </nav>);
}

export default Navigation;