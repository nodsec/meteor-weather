import { Meteor } from "meteor/meteor";
import HzsDatasource from "../datasource/hzs";
import SHMUDataSource from "../datasource/shmu";
import MeteoDatasource from "../datasource/meteo";
import CovidDatasouce from "../datasource/covid";

// HZSDatasource
Meteor.setInterval(() => {
    let ds = new HzsDatasource();
    ds.read(new Date());
}, 60000);

//SHMUDatasource
Meteor.setInterval(() => {
    let ds = new SHMUDataSource();
    ds.read(ds.Types.TYPE_TXT_WEATHER);
    ds.read(ds.Types.TYPE_WARNINGS);
}, 300000);

//MeteoDatasource
Meteor.setInterval(() => {
    let ds = new MeteoDatasource();
    ds.read();
}, 30000);

//CovidDatasouce
Meteor.setInterval(() => {
    let ds = new MeteoDatasource();
    ds.read();
}, 30000);

Meteor.setInterval(() => {
    let ds = new CovidDatasouce();
    ds.read();
}, 30000);