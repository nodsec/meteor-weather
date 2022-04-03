import moment from "moment";
import React from "react";
import { formatDateTime } from "../helpers/helpers";
import "../styles/warning-panel.css";

const WarningPanel = props => {
    const { warning } = props;
    if (!warning) return null;

    return (<div className={`warning-panel warning-level-${warning.level}`}>
        <div className={"warning-duration"}>
            {formatDateTime(warning.from)}&nbsp;-&nbsp;{formatDateTime(warning.to)}
        </div>
        <div className={"warning-phenomenon"}>{warning.phenomenon}</div>
        <div className={"warning-level"}>{warning.level}</div>
        <div className={"warning-text"}>{warning.text}</div>
    </div>);
}

export default WarningPanel;