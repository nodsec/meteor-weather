import moment from "moment";
import React from "react";

const CovidPanel = props => {

    let data = props.data;

    if (!data) return (<React.Fragment>
        No data yet available from {moment().add(-1, 'day').format('YYYY-MM-DD')}.
    </React.Fragment>);

    return (<React.Fragment>
        <div className="covid-panel">
            <div className="covid-pos">
                {data.pcr_pos}
            </div>
            <div className="covid-neg">
                {data.pcr_neg}
            </div>
            <div className="covid-total">
                {data.pcr_total}
            </div>
            <div className="covid-date">
                {data.date}
            </div>
        </div>
    </React.Fragment>);
}

export default CovidPanel;