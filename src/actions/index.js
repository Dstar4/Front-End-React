import axios from 'axios'

export const REGISTER_USER_START = 'REGISTER_USER_START';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const HANDLE_REGISTER_CHANGES = 'HANDLE_REGISTER_CHANGES';
export const HANDLE_LOGIN_CHANGES = 'HANDLE_LOGIN_CHANGES';
export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const GET_TRIPS_START = 'GET_TRIPS_START';
export const GET_TRIPS_SUCCESS = 'GET_TRIPS_SUCCESS';
export const GET_TRIPS_FAIL = 'GET_TRIPS_FAIL';
export const LOGOUT = 'LOGOUT';
export const GET_USER_START = 'GET_USER_START';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAIL = 'GET_USER_FAIL';
export const TOGGLE_EDIT_USER = 'TOGGLE_EDIT_USER';
export const HANDLE_EDIT_USER_CHANGES = 'HANDLE_EDIT_USER_CHANGES';
export const EDIT_USER_START = 'EDIT_USER_START';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAIL = 'EDIT_USER_FAIL';


const baseURL = 'https://guidr-api.herokuapp.com'

export const handleRegisterChanges = e => {
    return { type: HANDLE_REGISTER_CHANGES, payload: e }
}

export const handleLoginChanges = e => {
    return { type: HANDLE_LOGIN_CHANGES, payload: e }
}

export const handleEditUserChanges = e => {
    return { type: HANDLE_EDIT_USER_CHANGES, payload: e }
}

export const registerUser = newUser => dispatch => {
    dispatch({ type: REGISTER_USER_START})
    axios.post(`${baseURL}/auth/register`, newUser)
    .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.id);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data})
    })
    .catch(err => dispatch({ type: REGISTER_USER_FAIL, payload: err}))
}

export const loginUser = (username, password) => dispatch => {
    dispatch({type: LOGIN_USER_START })
    axios.post(`${baseURL}/auth/login`, {username: username, password: password})
    .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.id);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
        
    })
    .catch(err => dispatch({ type: LOGIN_USER_FAIL, payload: err }))
}

export const getTrips = id => dispatch => {
    const token = localStorage.getItem('token');
    const options = {
        headers: {
            Authorization: token,
        },
    }
    dispatch({ type: GET_TRIPS_START})
    axios.get(`${baseURL}/user/trips/${id}/all`, options)
        .then(res => {
            console.log(res);
            dispatch({ type: GET_TRIPS_SUCCESS, payload: res.data })
        })
        .catch(err => dispatch({ type: GET_TRIPS_FAIL, payload: err}))
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const getUser = id => dispatch => {
    const token = localStorage.getItem('token');
    const options = {
        headers: {
            Authorization: token,
        },
    }
    dispatch({ type: GET_USER_START })
    axios.get(`${baseURL}/user/guides/${id}`, options)
        .then(res => dispatch({ type: GET_USER_SUCCESS, payload: res.data}))
        .catch(err => dispatch({ type: GET_USER_FAIL, payload: err}))
}

export const toggleEditUser = () => {
    return (
        {type: TOGGLE_EDIT_USER}
    )
}

export const editUser = user => dispatch => {
    const token = localStorage.getItem('token');
    const options = {
        headers: {
            Authorization: token,
        },
    }
    dispatch({ type: EDIT_USER_START })
    axios.put(`${baseURL}/user/guides/update/${user.id}`, user, options)
        .then(res => {
            console.log(res);
            axios.get(`${baseURL}/user/guides/${user.id}`, options)
            .then(res => dispatch({ type: EDIT_USER_SUCCESS, payload: res.data}))
        })
}