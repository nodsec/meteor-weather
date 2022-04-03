import React from "react";
import WarningPanel from "../../WarningPanel";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {ShmuCollectionWarnings} from "../../../api/ShmuCollectionWarnings";
import {SHMUCollectionWeather} from "../../../api/ShmuCollectionWeather";

const SHMUComponent = props => {
    let {shmuWarnings, shmuWeather} = props.data;

    return(<React.Fragment>
        <div className={'warnings'}>
            {shmuWarnings && shmuWarnings.warnings.map((warning, index) => {
                return (<React.Fragment key={index}>
                    <WarningPanel warning={warning}/>
                </React.Fragment>)
            })}
        </div>
    </React.Fragment>)
}

const SHMU = withTracker((props) => {
    let isReady = function () {
        let subs = [
            Meteor.subscribe('shmu_warnings')
        ];
        let ready = true;
        subs.forEach((sub) => {
            if (!sub.ready())
                ready = false;
        });
        return ready;
    };

    let data: any = {dataLoading: true};

    if (isReady()) {
        data = {
            dataLoading: false,
            shmuWarnings: ShmuCollectionWarnings.findOne({}),
            shmuWeather: SHMUCollectionWeather.find({}).fetch()
        };
    }
    return {data: data};

})(SHMUComponent);

export default SHMU;