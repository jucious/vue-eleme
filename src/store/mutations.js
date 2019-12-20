import {RECORD_ADDRESS,SAVE_GEOHASH} from './mutation-type'
export default {
    [RECORD_ADDRESS](state,geohash){
        const geoArr = geohash.split(',');
        state.latitude = geoArr[0];
        state.longitude = geoArr[1];
    },
    [SAVE_GEOHASH](state,geohash){
        state.geohash = geohash;
    }
}