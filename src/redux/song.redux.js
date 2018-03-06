import axios from 'axios';

const NEW_SONG_BANNER = 'NEW_SONG_BANNER';
const SONG_RANK = 'SONG_RANK';
const HOT_SONG = 'HOT_SONG';
const SINGER_LIST = 'SINGER_LIST';

const initState = {
    newSongs: [],
    banners: [],
    songRankList: [],
    hotSongList: [],
    singerList: []
};

export function newsong (state = initState, action) {
    switch (action.type) {
        case NEW_SONG_BANNER:
            return {
                ...state,
                newSongs: action.payload.data,
                banners: action.payload.banner
            };
        case SONG_RANK:
            return {
                ...state,
                songRankList: action.payload
            };
        case HOT_SONG:
            return {
                ...state,
                hotSongList: action.payload
            }
        case SINGER_LIST:
            return {
                ...state,
                singerList: action.payload
            }
        default:
            return state;
    }
}

function newSongBanner (data) {
    return {type: NEW_SONG_BANNER, payload: data};
}

function songRank (data) {
    return {type: SONG_RANK, payload: data};
}

function hotSong (data) {
    return {type: HOT_SONG, payload: data};
}

function singerList (data) {
    return {type: SINGER_LIST, payload: data}
}

export function getNewSong () {
    return dispatch => {
        axios.get('/proxy/?json=true').then(res => {
            if (res.status === 200) {
                dispatch(newSongBanner(res.data));
            }

        });
    }
}

export function getSongRank () {
    return dispatch => {
        axios.get('/proxy/rank/list&json=true').then(res => {
            if (res.status === 200) {
                dispatch(songRank(res.data.rank.list));
            }
        });
    }
}

export function getHotSong () {
    return dispatch => {
        axios.get('/proxy/plist/index&json=true').then(res => {
            if (res.status === 200) {
                dispatch(hotSong(res.data.plist.list.info));
            }
        });
    }
}

export function getSingerList () {
    return dispatch => {
        axios.get('/proxy/singer/class&json=true').then(res => {
            if (res.status === 200) {
                dispatch(singerList(res.data.list));
            }
        });
    }
}