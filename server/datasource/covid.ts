
import axios from "axios";
import csv from "csvtojson";
import { CovidCollectionHospital } from "../../imports/api/CovidCollectionHospital";
import { CovidCollectionPCR } from "../../imports/api/CovidCollectionPCR";

class CovidDatasouce {

    private BASE_URL_HOSPITAL = "https://raw.githubusercontent.com/Institut-Zdravotnych-Analyz/covid19-data/main/Hospitals/OpenData_Slovakia_Covid_Hospital_Full.csv";
    private BASE_URL_PCR = "https://raw.githubusercontent.com/Institut-Zdravotnych-Analyz/covid19-data/main/PCR_Tests/OpenData_Slovakia_Covid_PCRTests_District.csv";

    private _csvArrayParse(data: any) {
        const header = data[0];
        let result = [];
        data.forEach(function (item, index) {
            if (!index) return;
            result.push(item);
        })

        result = result.map(function (row, index) {
            let r = {};
            row.forEach(function (item: any, index2: any) {
                let h = header[index2].toLowerCase();
                let v = isNaN(item) ? item : parseFloat(item);
                r[h] = v;
            })
            return r;
        })
        return result;
    }

    private _readHospitals() {
        axios.get(this.BASE_URL_HOSPITAL)
            .then(response => {
                const csvstr = response.data;

                csv({
                    noheader: true,
                    output: "csv",
                    delimiter: ';'
                }).fromString(csvstr)
                    .then(Meteor.bindEnvironment((csvRow) => {
                        let JSONdata = this._csvArrayParse(csvRow);
                        CovidCollectionHospital.remove({});
                        JSONdata.forEach(row => {
                            CovidCollectionHospital.insert(row);
                        });
                    }))
            })
    }

    private _readPCR() {

        axios
            .get(this.BASE_URL_PCR)
            .then((response) => {
                const csvstr = response.data;

                csv({
                    noheader: true,
                    output: "csv",
                    delimiter: ';'
                }).fromString(csvstr)
                    .then(Meteor.bindEnvironment((csvRow) => {
                        let JSONdata = this._csvArrayParse(csvRow);
                        CovidCollectionPCR.remove({});
                        JSONdata.forEach(row => {
                            CovidCollectionPCR.insert(row);
                        });
                    }))
            })

    }

    public read() {
        this._readHospitals();
        this._readPCR();
    }
}

export default CovidDatasouce;
