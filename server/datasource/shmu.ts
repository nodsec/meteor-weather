import axios from "axios";
import moment from "moment";
import { ShmuCollectionWarnings } from "../../imports/api/ShmuCollectionWarnings";
import { SHMUCollectionWeather } from "../../imports/api/ShmuCollectionWeather";
const jsdom = require("jsdom");
const districts = require("obce-okresy-kraje-slovenska/JSON/districts.json");


class SHMUDataSource {

    private BASE_URL_WARNINGS = "https://www.shmu.sk/popups/meteo/vystrahy.php";

    private BASE_URL_TXT_WEATHER = "https://www.shmu.sk/sk/print_page.php?page=1&id=meteo_tpredpoved_vt&page=107&lang=sk";

    public Types = {
        TYPE_WARNINGS: "warnings",
        TYPE_TXT_WEATHER: "txt_weather"
    }

    public _readWarnings(region: string) {
        if (!region) return;

        axios.get(this.buildUrl(region)).then(response => {
            const dom = new jsdom.JSDOM(response.data);
            const jquery = require("jquery")(dom.window);

            let warnings = [];

            jquery("table tbody tr").each((i, tableRow) => {
                let warning: any = {
                    from: null,
                    to: null,
                    phenomenon: '',
                    level: null,
                    text: null,
                    additional: ''
                };

                const secondTd = jquery(jquery(tableRow).children("td").eq(1));
                if (!secondTd) return;

                const firstDiv = jquery(secondTd).children("div").eq(0);
                if (firstDiv) {
                    warning.phenomenon = jquery(firstDiv).find("strong").eq(0).text();
                    warning.level = parseInt(jquery(firstDiv).find("strong").eq(1).text().replace(/[^0-9]/g, ''));
                }

                let duration = jquery(secondTd).children("strong").first().text();
                if (duration) {
                    duration = duration.replace("od ", "");
                    let durationSplit = duration.split(" do ");
                    if (durationSplit.length === 2) {
                        warning.from = moment(durationSplit[0], "DD.MM.YYYY hh:mm").toDate();
                        warning.to = moment(durationSplit[1], "DD.MM.YYYY hh:mm").toDate();
                    }
                }

                let text = jquery(secondTd)
                    .clone()
                    .children() //select all the children
                    .remove()   //remove all the children
                    .end()  //again go back to selected element
                    .text().replace(/(\r\n|\n|\r)/gm, "").trim();

                const textSplit = text.split("   ");

                warning.text = textSplit[0];
                warning.additional = textSplit[textSplit.length - 1]

                warnings.push(warning);
            });

            let maxLevel = 0;
            if (warnings && warnings.length) {
                warnings.forEach(w => {
                    if (w.level > maxLevel)
                        maxLevel = w.level;
                })
            }

            let result = {
                _id: `${moment().format('YYYYMMDD')}${region.toUpperCase()}`,
                date: moment().toDate(),
                region,
                warnings,
                warningsCount: warnings.length,
                warningsLevel: maxLevel
            }

            if (ShmuCollectionWarnings.findOne({ _id: result._id })) {
                ShmuCollectionWarnings.update({ _id: result._id }, result);
            } else {
                ShmuCollectionWarnings.insert(result);
            }

        }).catch(error => {
            console.error(error);
        });
    }

    private _readWeather() {
        axios.get(this.BASE_URL_TXT_WEATHER).then(response => {
            const dom = new jsdom.JSDOM(response.data);
            const jquery = require("jquery")(dom.window);

            let weather = {
                date: moment().toDate(),
                text: jquery("pre").text()
            }

            SHMUCollectionWeather.insert(weather);
        });
    }

    private buildUrl(region: string) {
        let url = new URL(this.BASE_URL_WARNINGS);

        if (region) {
            url.searchParams.append("region", region);
        }

        return url.toString();
    }

    public read(type: string) {
        if (!type) return;

        if (type === this.Types.TYPE_WARNINGS) {
            let delay = 0;
            districts.forEach(d => {
                let area = d.veh_reg_num;
                if (area) {
                    area = area.substring(0, 2);
                    setTimeout((area) => {
                        this._readWarnings(area);
                    }, delay, area);
                }
                delay += 5000;
            })
        }

        if (type === this.Types.TYPE_TXT_WEATHER) {
            this._readWeather();
        }
    }
}

export default SHMUDataSource;

