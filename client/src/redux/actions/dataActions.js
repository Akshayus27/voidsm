import {
    SET_ENGRAVES,
    LOADING_DATA,
    VOTE_ENGRAVE,
    UNVOTE_ENGRAVE,
    DELETE_ENGRAVE,
    SET_ERRORS,
    POST_ENGRAVE,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_ENGRAVE,
    STOP_LOADING_UI,
    SUBMIT_ENLIGHTEN,
    DELETE_ENLIGHTEN
} from '../types'
import axios from 'axios'

export const getEngraves = () => (dispatch) => {
    dispatch({ type: LOADING_DATA })
    axios
        .get('/engrave')
        .then((res) => {
            dispatch({
                type: SET_ENGRAVES,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_ENGRAVES,
                payload: []
            })
        })
}

export const getEngrave = (engraveId) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios
        .get(`/engrave/${engraveId}`)
        .then((res) => {
            dispatch({
                type: SET_ENGRAVE,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch((err) => {return})
}

export const postEngrave = (newEngrave) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios
        .post('/engrave/create', newEngrave)
        .then((res) => {
            dispatch({
                type: POST_ENGRAVE,
                payload: res.data
            });
            dispatch(clearErrors())
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const voteEngrave = (engraveId) => (dispatch) => {
    axios
        .get(`/engrave/${engraveId}/vote`)
        .then((res) => {
            dispatch({
                type: VOTE_ENGRAVE,
                payload: res.data
            })
            dispatch(getEngrave(engraveId))
        })
        .catch((err) => {return})
}

export const unvoteEngrave = (engraveId) => (dispatch) => {
    axios
        .get(`/engrave/${engraveId}/vote`)
        .then((res) => {
            dispatch({
                type: UNVOTE_ENGRAVE,
                payload: res.data
            })
            dispatch(getEngrave(engraveId))
        })
        .catch((err) => {return})
}

export const submitEnlighten = (engraveId, enlightenData) => (dispatch) => {
    axios
        .post(`/engrave/${engraveId}/enlighten`, enlightenData)
        .then((res) => {
            dispatch({
                type: SUBMIT_ENLIGHTEN,
                payload: res.data
            })
            dispatch(clearErrors())
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err
            })
        })
}

export const getEnlighten = (engraveId) => (dispatch) => {
    axios
        .get(`/engrave/${engraveId}/enlightens`)
        .then((res) => {
            dispatch({
                type: SUBMIT_ENLIGHTEN,
                payload: res.data
            })
            dispatch(clearErrors())
        })
        .catch((err) => {return})
}

export const deleteEngrave = (engraveId) => (dispatch) => {
    axios
        .delete(`/engrave/${engraveId}/delete`)
        .then(() => {
            dispatch({ type: DELETE_ENGRAVE, payload: engraveId })
        })
        .catch((err) => {return})
}

export const deleteEnlighten= (engraveId) => (dispatch) => {
    axios
        .delete(`/engrave/${engraveId}/unenlighten`)
        .then(() => {
            dispatch({ type: DELETE_ENLIGHTEN, payload: engraveId })
        })
        .catch((err) => {return})
}

export const getMonkData = (handle) => (dispatch) => {
    dispatch({ type: LOADING_DATA })
    axios
        .get(`/monk/${handle}/engraves`)
        .then((res) => {
            dispatch({
                type: SET_ENGRAVES,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: SET_ENGRAVES,
                payload: null
            })
        })
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}