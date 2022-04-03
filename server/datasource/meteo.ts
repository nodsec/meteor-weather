import axios from "axios";
import {MeteoCollection} from "../../imports/api/MeteoCollection";
import moment from "moment";

class MeteoDatasource {

    private BASE_URL="https://api.openweathermap.org/data/2.5/weather?q=poprad,sk&appid=ed938096f01cc28bdcc146f44dcbe646";

    private _read() {
        axios.get(this.BASE_URL).then(response => {
            let data = response.data;
            if(data && data.id) {
                data.date = moment().toDate();
                data._id = ""+data.id;
                delete(data.id);

                if(MeteoCollection.findOne({_id: data._id})) {
                    MeteoCollection.update({_id: data._id}, data);
                } else {
                    MeteoCollection.insert(data);
                }
            }
        })
    }

    public read() {
        this._read();
    }
}

export default MeteoDatasource;