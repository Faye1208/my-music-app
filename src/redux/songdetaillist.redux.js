import axios from 'axios';

const RANK_DETAIL = 'RANK_DETAIL';
const HOT_DETAIL = 'HOT_DETAIL';
const SINGER_CLASS = 'SINGER_CLASS';
const SINGER_SONGS = 'SINGER_SONGS';

const initState = {
    ranksongs: [],
    rankinfo: [],
    hotDetailInfo: [],
    hotDetailSongs: [],
    singerClassList: [],
    singerClassName: '',
    singerSongs: [],
    singerInfo: {}
};

export function songdetaillist (state = initState, action) {
    switch (action.type) {
        case RANK_DETAIL:
            return {
                ...state,
                ranksongs: action.payload.songs,
                rankinfo: action.payload.info
            };
        case HOT_DETAIL:
            return {
                ...state,
                hotDetailSongs: action.payload.list.list.info,
                hotDetailInfo: action.payload.info.list
            };
        case SINGER_CLASS:
            return {
                ...state,
                singerClassList: action.payload.singers.list.info,
                singerClassName: action.payload.classname
            }
        case SINGER_SONGS:
            return {
                ...state,
                singerSongs: action.payload.songs.list,
                singerInfo: action.payload.info
            }
        default:
            return state;
    }
}

function rankDetail ({songs, info}) {
    return {type: RANK_DETAIL, payload: {songs, info}};
}

function hotDetail ({list, info}) {
    return {type: HOT_DETAIL, payload: {list, info}}
}

function singerClass (data) {
    return {type: SINGER_CLASS, payload: data};
}

function singerSongs (data) {
    return {type: SINGER_SONGS, payload: data}
}

export function getRankDetail (rankid) {
    return dispatch => {
        axios.get(`/proxy/rank/info/?rankid=${rankid}&page=1&json=true`)
            .then(res => {
                if ((res.status >= 200 && res.status < 300) || res.status === 304) {
                    dispatch(rankDetail(res.data));
                }
            });
    }
}

export function getHotDetail (specialid) {
    return dispatch => {
        axios.get(`/proxy/plist/list/${specialid}?json=true`)
            .then(res => {
                if ((res.status >= 200 && res.status < 300) || res.status === 304) {
                    dispatch(hotDetail(res.data));
                }
            })
    }
}

export function getSingerClass (classid) {
    return dispatch => {
        axios.get(`/proxy/singer/list/${classid}?json=true`)
            .then(res => {
                if ((res.status >= 200 && res.status < 300 ) || res.status === 304) {
                    dispatch(singerClass(res.data));
                }
            })
    }
}

export function getSingerSongs (singerid) {
    return dispatch => {
        axios.get(`/proxy/singer/info/${singerid}?json=true`)
            .then(res => {
                if ((res.status >= 200 && res.status < 300 ) || res.status === 304) {
                    dispatch(singerSongs(res.data));
                }
            })
    }
}