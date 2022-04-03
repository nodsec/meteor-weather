import React from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { MeteoCollection } from "../api/MeteoCollection";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { ShmuCollectionWarnings } from "../api/ShmuCollectionWarnings";
import { SHMUCollectionWeather } from "../api/ShmuCollectionWeather";
import WarningPanel from "./WarningPanel";
import MeteoPanel from './MeteoPanel';
import CovidPanel from './CovidPanel';
import { CovidCollectionPCR } from '../api/CovidCollectionPCR';

const AppComponent = (props) => {
    let { meteo, shmuWarnings, shmuWeather, dataLoading, covidPCR } = props.data;
    if (dataLoading) return null;

    console.log(props.data);
    return <React.Fragment>

        <div className='meteo'>
            <MeteoPanel meteo={meteo} shmuWeather={shmuWeather} />
        </div>

        <div className='covid'>
            <CovidPanel data={covidPCR} />
        </div>

        <div className={'warnings'}>
            {shmuWarnings && shmuWarnings.warnings.map((warning, index) => {
                return (<React.Fragment key={index}>
                    <WarningPanel warning={warning} />
                </React.Fragment>)
            })}
        </div>

        <button className={"btn btn-primary"} onClick={event => {
            event.preventDefault();
            Meteor.call('refresh');
        }
        }>Refresh</button>

        <div>
            {props.content}
        </div>
    </React.Fragment>;
};

const App = withTracker((props) => {
    let isReady = function () {
        let subs = [
            Meteor.subscribe('meteo'),
            Meteor.subscribe('shmu_warnings', 'PP'),
            Meteor.subscribe('shmu_weather'),
            Meteor.subscribe('covid_pcr')
        ];
        let ready = true;
        subs.forEach((sub) => {
            if (!sub.ready())
                ready = false;
        });
        return ready;
    };

    let data: any = { dataLoading: true };

    if (isReady()) {
        data = {
            dataLoading: false,
            meteo: MeteoCollection.findOne({}),
            shmuWarnings: ShmuCollectionWarnings.findOne({}),
            shmuWeather: SHMUCollectionWeather.findOne({}),
            covidPCR: CovidCollectionPCR.findOne({})
        };
    }
    return { data: data };

})(AppComponent);

export default App;
