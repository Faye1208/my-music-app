import axios from 'axios';

const SONG_INFO = 'SONG_INFO';
const initState = {
    songInfo: {}
};

export function player (state = initState, action) {
    switch (action.type) {
        case SONG_INFO:
            return {...state, songInfo: action.payload.data}
        default:
            return state;
    }
}

function songInfo (data) {
    return {type: SONG_INFO, payload: data}
}

export function getSongInfo (hash) {
    return dispatch => {
        axios.get(`/dproxy/yy/index.php?r=play/getdata&hash=${hash}`)
            .then(res => {
                if ([(res.status >= 200 && res.status < 300 ) || res.status === 304] && res.data.err_code === 0) {
                    dispatch(songInfo(res.data));
                }
            })
    };
}