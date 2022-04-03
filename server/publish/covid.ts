import moment from "moment";
import { CovidCollectionPCR } from "../../imports/api/CovidCollectionPCR";

Meteor.publish('covid_pcr', () => {
    let date = moment().add(-1, 'day').format('YYYY-MM-DD');
    return CovidCollectionPCR.find({ district: "Okres Poprad", date: date });
})