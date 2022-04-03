import {MeteoCollection} from "../../imports/api/MeteoCollection";
import moment from "moment";

Meteor.publish('meteo', () => {
    let from = moment().startOf('day').toDate();
    let to = moment().endOf('day').toDate();
    return MeteoCollection.find({date: {$gte: from,$lte: to}});
});