import {Meteor} from "meteor/meteor";
import HzsDatasource from "../datasource/hzs";
import SHMUDataSource from "../datasource/shmu";
import MeteoDatasource from "../datasource/meteo";

Meteor.methods({
    refresh: () => {
            let ds1 = new HzsDatasource();
            ds1.read(new Date());

            let ds2 = new SHMUDataSource();
            ds2.read(ds2.Types.TYPE_TXT_WEATHER);
            ds2.read(ds2.Types.TYPE_WARNINGS);

            let ds3 = new MeteoDatasource();
            ds3.read();
    }
})