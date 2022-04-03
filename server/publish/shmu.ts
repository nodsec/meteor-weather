import {SHMUCollectionWeather} from "../../imports/api/ShmuCollectionWeather";
import {ShmuCollectionWarnings} from "../../imports/api/ShmuCollectionWarnings";
import {check} from "meteor/check";

Meteor.publish('shmu_weather', () => {
    return SHMUCollectionWeather.find({}, {sort: {date: -1}, limit: 1});
});

Meteor.publish('shmu_warnings', (region:string = "PP") => {
    check(region, String);
    return ShmuCollectionWarnings.find({region}, {sort: {date: -1}, limit: 1});
});