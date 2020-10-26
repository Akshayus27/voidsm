
import {
    SET_ENGRAVES,
    VOTE_ENGRAVE,
    UNVOTE_ENGRAVE,
    LOADING_DATA,
    DELETE_ENGRAVE,
    POST_ENGRAVE,
    SET_ENGRAVE,
    SUBMIT_ENLIGHTEN,
    DELETE_ENLIGHTEN
} from '../types'

const initialState = {
    engraves: [],
    engrave: {},
    enlightens: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_ENGRAVES:
            return {
                ...state,
                engraves: action.payload,
                loading: false
            }
        case SET_ENGRAVE:
            return {
                ...state,
                engrave: action.payload
            }
        case VOTE_ENGRAVE:
        case UNVOTE_ENGRAVE:
            let index = state.engraves.findIndex((engrave) => engrave._id === action.payload._id)
            state.engraves[index] = action.payload
            return {
                ...state,
            }
        case DELETE_ENGRAVE:
            index = (state.engraves._id === action.payload)
            state.engraves.splice(index, 1)
            return {
                ...state
            }
        case POST_ENGRAVE:
            return {
                ...state,
                engraves: [action.payload, ...state.engraves]
            }
        case SUBMIT_ENLIGHTEN:
            return {
                ...state,
                enlightens: [...action.payload]
            }
        case DELETE_ENLIGHTEN:
            return {
                ...state,
                enlightens: [...action.payload]
            }
        default:
            return state
    }
}