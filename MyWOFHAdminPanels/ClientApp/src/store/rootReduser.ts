import {combineReducers,Action} from "redux"
import {ThunkAction} from 'redux-thunk'
import {authorizeReduser} from "./Reducers/AuthReducer/authorizeReducer"
// import {rootState} from './combineState'

export const rootReduser = combineReducers({
    authorize:authorizeReduser
})

export type appStateType = ReturnType<typeof rootReduser>
