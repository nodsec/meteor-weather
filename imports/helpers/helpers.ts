import { round } from "lodash-es";
import moment from "moment";

export const formatNumber = (value: number, decimals: number = 2) => {
    return round(value, decimals);

}

export const formatTemperature = (value: number, decimals: number = 2) => {
    return formatNumber(-272.15 + value, decimals) + '°C';
}


export const formatSpeed = (value: number, decimals: number = 2) => {
    return formatNumber(value, decimals) + 'm/s';

}


export const formatDeg = (value: number, decimals: number = 0) => {
    return formatNumber(value, decimals) + '°';

}

export const formatDateTime = (value: number) => {
    return moment(value).format('MM.DD.YYYY hh:mm:ss');

}