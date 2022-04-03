import axios from "axios";
import moment from "moment";

import {HzsCollectionLaviny} from "../../imports/api/HzsCollectionLaviny";
import {HzsCollectionVystrahy} from "../../imports/api/HzsCollectionVystrahy";
import {HzsCollectionAladin} from "../../imports/api/HzsCollectionAladin";

class HzsDatasource {

    private BASE_URL="https://www.hzs.sk/ws_client";

    public Types = {
        TYPE_LAVINY_SITUACIA: "laviny_situacia",
        TYPE_POHORIA_VYSTRAHY: "pohoria_vystrahy",
        TYPE_ALADIN: null
    };

    private buildUrl(date:Date|moment.Moment, type:string) {
        let url = new URL(this.BASE_URL);

        if(date) {
            const dateStr = moment(date).format('YYYY-MM-DD');
            url.searchParams.append("date", dateStr);
        }

        if(type)
            url.searchParams.append("typ", type);

        return url.toString();
    }

    private _read(date:Date|moment.Moment, type:string = this.Types.TYPE_ALADIN) {
        axios.get(this.buildUrl(date, type)).then(response => {
            const data = response.data;
            if(!data) return;

            if(type === this.Types.TYPE_POHORIA_VYSTRAHY || type === this.Types.TYPE_LAVINY_SITUACIA) {
                data.forEach(d => {
                    d._id = d.id;
                    delete(d.id);

                    if(type === this.Types.TYPE_POHORIA_VYSTRAHY) {
                        if(HzsCollectionVystrahy.findOne({_id: d._id})) {
                            HzsCollectionVystrahy.update({_id: d._id}, d);
                        } else {
                            HzsCollectionVystrahy.insert(d);
                        }
                    }

                    if(type === this.Types.TYPE_LAVINY_SITUACIA) {
                        if(HzsCollectionLaviny.findOne({_id: d._id})) {
                            HzsCollectionLaviny.update({_id: d._id}, d);
                        } else {
                            HzsCollectionLaviny.insert(d);
                        }
                    }
                });
            }

            if(!type || type === this.Types.TYPE_ALADIN) {
                for(let pohorieId in data) {
                    for(let vyskaId in data[pohorieId]) {
                        let d = data[pohorieId][vyskaId];
                        if(d && d.id) {
                            d._id = d.id;
                            delete(d.id);
                            if(HzsCollectionAladin.findOne({_id: d._id})) {
                                HzsCollectionAladin.update({_id: d._id}, d);
                            } else {
                                HzsCollectionAladin.insert(d);
                            }
                        }
                    }
                }
            }
        }).catch(error => {
            console.error(error);
        })
    }

    public read(date:Date|moment.Moment) {
        this._read(date, this.Types.TYPE_LAVINY_SITUACIA);
        this._read(date, this.Types.TYPE_POHORIA_VYSTRAHY);
        this._read(date, this.Types.TYPE_ALADIN);
    }

    public migrate() {
        const dateFrom = moment("2000-01-01", "YYYY-MM-DD");
        const dateTo = moment();
        let delay = 0;

        for (let m = dateFrom; m.diff(dateTo, 'days') <= 0; m.add(1, 'days')) {
            setTimeout((day) => {
                console.log(day.format('YYYY-MM-DD'));
                this.read(day);
            }, delay, moment(m));

            delay += 500;
        }
    }
}

export default HzsDatasource;