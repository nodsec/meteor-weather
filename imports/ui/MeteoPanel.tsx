import React from "react";
import "../styles/meteo-panel.css";
import { formatTemperature, formatSpeed, formatDeg, formatDateTime } from "../helpers/helpers";


const MeteoPanel = props => {

    const { meteo, shmuWeather } = props;

    return (<React.Fragment>
        <div className="meteo-panel">

            <h3>Meteo panel</h3>


            <div className="meteo-temp">
                <h5>Teplota ovzdusia:<br />
                    {formatTemperature(meteo.main.temp)}</h5>
            </div>


            <div className="meteo-temp-feeling">
                <h5> Pocitova teplota:<br />
                    {formatTemperature(meteo.main.feels_like)}</h5>

            </div>

            <div className="meteo-wind-speed">
                <h5>Rychlost a narazy vetra:<br />
                    {formatSpeed(meteo.wind.speed)}&nbsp;
                </h5>
                <h5>Smer vetra <br />
                    {formatDeg(meteo.wind.deg)}
                </h5>

            </div>

            <div className="meteo-date">
                <h5>Datum a cas: <br />
                    {formatDateTime(meteo.date)}
                </h5>
            </div>

            {shmuWeather && <div className="meteo-text">
                <br />
                {shmuWeather.text}
                <br /> <br />
                {formatDateTime(shmuWeather.date)}
            </div>}
        </div>
    </React.Fragment>);
};

export default MeteoPanel;