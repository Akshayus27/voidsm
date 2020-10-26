import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import monkReducer from './reducers/monkReducer'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'

const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
    monk: monkReducer,
    data: dataReducer,
    UI: uiReducer
  })

const store = createStore(
    reducers, 
    initialState, 
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
  
export default store

