import axios from 'axios';

const TRYSONG_LIST = 'TRYSONG_LIST';
const ERROR_MSG = 'ERROR_MSG';
const SONG_UPDATE = 'SONG_UPDATE';

const initState = {
    trysongList: [],
    msg: ''
};

export function mysong (state = initState, action) {
    switch (action.type) {
        case TRYSONG_LIST:
            return {
                ...state,
                trysongList: action.payload,
                msg: ''
            };
        case ERROR_MSG:
            return {...state, msg: action.msg}
        default:
            return state;
    }
}

function errorMsg (msg) {
    return {msg, type: ERROR_MSG}
}

function trysongList (data) {
    return {type: TRYSONG_LIST, payload: data};
}

function songUpdate (data) {
    return {type: SONG_UPDATE, payload: data}

}

export function getTrysongList () {
    return dispatch => {
        axios.get('/mproxy/song/getsong')
            .then(res => {
                if ([(res.status >= 200 && res.state < 300) || res.status === 304] && res.data.err_code === 0) {
                    dispatch(trysongList(res.data.data));
                }
                dispatch(errorMsg(res.data.msg));
            })
    }
}

export function toSongUpdate (data) {
    return dispatch => {
        axios.post('/mproxy/song/updatesong', data)
            .then(res => {
                if ([(res.status >= 200 && res.state < 300) || res.status === 304] && res.data.err_code === 0) {
                    dispatch(songUpdate(data));
                }
                dispatch(errorMsg(res.data.msg));
            })
    }
}