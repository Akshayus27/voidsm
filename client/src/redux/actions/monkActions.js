import {
    SET_MONK,
    SET_ERRORS,
    SET_ERROR_KEY,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_MONK,
    MARK_NOTIFICATIONS_READ,
    GET_NOTIFICATIONS
} from '../types'
import axios from 'axios'

export const loginMonk = (monkData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios
        .post('/login', monkData)
        .then(res => {
            if (res.status !== 400) {
                setAuthHeader(res.data)
                dispatch(getMonkData())
                dispatch({ type: CLEAR_ERRORS})
                history.push('/')
            }
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
            dispatch({
                type: SET_ERROR_KEY,
                payload: err.response.data.split(' ')[0]
            })
        })
}

export const signUpMonk = (newMonkData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios
        .post('/sign-up', newMonkData)
        .then(res => {
            if (res.status !== 400) {
                setAuthHeader(res.data)
                dispatch(getMonkData())
                dispatch({ type: CLEAR_ERRORS})
                history.push('/')
            }
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
            dispatch({
                type: SET_ERROR_KEY,
                payload: err.response.data.split(' ')[0]
            })       
        })
}

export const logOutMonk = () => (dispatch) => {
    localStorage.removeItem('AuthToken')
    delete axios.defaults.headers.common['AuthToken']
    dispatch({ type: SET_UNAUTHENTICATED })
}

export const getMonkData = () => (dispatch) => {
    dispatch({ type: LOADING_MONK })
    axios
        .get('/monk')
        .then((res) => {
            dispatch({
                type: SET_MONK,
                payload: res.data
            })
        })
        .catch((err) => {return})
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_MONK });
    axios
        .put('/monk/dp', formData)
        .then(() => {
            dispatch(getMonkData())
        })
        .catch((err) => {return})
}

export const editMonkDetails = (monkDetails) => (dispatch) => {
    dispatch({ type: LOADING_MONK })
    axios
        .put('/monk/update', monkDetails)
        .then(() => {
            dispatch(getMonkData())
        })
        .catch((err) => {return})
}

export const markNotificationsRead = (notificationIds) => (dispatch) => {
    axios
        .post(`/notification/${notificationIds}`)
        .then((res) => {
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            })
        })
        .catch((err) => {return})
}

export const getNotifications = () => (dispatch) => {
    axios
        .get(`/notification`)
        .then((res) => {
            dispatch({
                type: GET_NOTIFICATIONS,
                payload: res.data
            })
        })
        .catch((err) => {return})
}

const setAuthHeader = (token) => {
    const AuthToken = token
    localStorage.setItem('AuthToken', AuthToken)
    axios.defaults.headers.common['AuthToken'] = AuthToken
}