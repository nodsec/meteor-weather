import React from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {MeteoCollection} from "../../../api/MeteoCollection";
import MeteoPanel from "../../MeteoPanel";

const MeteoComponent = props => {
    let {meteo} = props.data;

    return(<React.Fragment>
        <MeteoPanel data={meteo}/>
    </React.Fragment>)
}

const Meteo = withTracker((props) => {
    let isReady = function () {
        let subs = [
            Meteor.subscribe('meteo')
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
            meteo: MeteoCollection.findOne({})
        };
    }
    return {data: data};

})(MeteoComponent);

export default Meteo;