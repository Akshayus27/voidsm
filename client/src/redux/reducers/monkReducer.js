import {
    SET_MONK,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_MONK,
    VOTE_ENGRAVE,
    UNVOTE_ENGRAVE,
    MARK_NOTIFICATIONS_READ,
    GET_NOTIFICATIONS, 
    SET_ERRORS, 
    SET_ERROR_KEY
  } from '../types'
  
  const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    errors: {},
    errKey: '',
    notifications: [],
    votes: []
  }
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_AUTHENTICATED:
        return {
          ...state,
          authenticated: true
        }
      case SET_UNAUTHENTICATED:
        return initialState;
      case SET_MONK:
        return {
          ...state,
          authenticated: true,
          loading: false,
          credentials: {...action.payload}
        }
      case LOADING_MONK:
        return {
          ...state,
          loading: true
        }
      case SET_ERRORS:
        return {
          ...state,
          errors: action.payload
        }
      case SET_ERROR_KEY:
        return {
          ...state,
          errKey: action.payload
        }
      case VOTE_ENGRAVE:
        return {
          ...state,
          votes: [
            ...state.votes,
            {
              handle: state.credentials.handle,
              engraveId: action.payload.engraveId
            }
          ]
        }
      case UNVOTE_ENGRAVE:
        return {
          ...state,
          votes: state.votes.filter(
            (vote) => (action.payload.handle !== vote.handle) && (action.payload.engarveId !== vote.engraveId)
          )
        }
      case MARK_NOTIFICATIONS_READ:
        state.notifications.forEach((not) => (not.read = true));
        return {
          ...state
        }
      case GET_NOTIFICATIONS:
        return {
          ...state,
          notifications: [...action.payload]
        }
      default:
        return state
    }
  }