import { combineReducers, createStore } from "redux"
import authReducer from "./auth/reducer"

const rootReducer = combineReducers({
    auth:authReducer
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store