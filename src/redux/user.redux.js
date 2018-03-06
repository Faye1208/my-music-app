import axios from 'axios';
import {getRedirectPath} from "../utils";

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESSS = 'AUTH_SUCCESSS';
const LOGOUT = 'LOGOUT';
const initState = {
    redirectTo: '',
    // isAuth: false,
    user: '',
    type: '',
    msg: ''
};

export function user (state = initState, action) {
    switch (action.type) {
        // case REGISTER_SUCCESS:
        //     return {...state, isAuth: true, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
        // case LOGIN_SUCCESS:
        //     return {...state, isAuth: true, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
        case AUTH_SUCCESSS:
            return {...state, redirectTo: getRedirectPath(action.payload), msg: '', ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case LOGOUT:
            return {...initState, redirectTo: '/login'}
        default:
            return state;
    }
}

// function registerSuccess (data) {
//     return {type: REGISTER_SUCCESS, payload: data}
// }
//
// function loginSuccess (data) {
//     return {type: LOGIN_SUCCESS, payload: data}
// }

function errorMsg (msg) {
    return {msg, type: ERROR_MSG}
}

function authSuccess (obj) {
    const {pwd, ...data} = obj;
    return {type: AUTH_SUCCESSS, payload: data};
}


export function loadData (userinfo) {
    return {type: LOAD_DATA, payload: userinfo}
}

export function register ({user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名和密码不能为空');
    }
    if (repeatpwd !== pwd) {
        return errorMsg('两次密码不一样');
    }
    return dispatch => {
        axios.post('/mproxy/user/register', {user, pwd, type})
            .then(response => {
                if (response.status === 200 && response.data.code === 0) {
                    dispatch(authSuccess({user, pwd, type}));
                } else {
                    dispatch(errorMsg(response.data.msg));
                }
            });
    }
}

export function login ({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名和密码不能为空');
    }
    return dispatch => {
        axios.post('/mproxy/user/login', {user, pwd})
            .then(response => {
                if (response.status === 200 && response.data.code === 0) {
                    dispatch(authSuccess(response.data.data));
                } else {
                    dispatch(errorMsg(response.data.msg));
                }
            });
    }
}

export function update (data) {
    return dispatch => {
        axios.post('/mproxy/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            });
    }

}

export function logoutSubmit () {
    return {type: LOGOUT}
}




