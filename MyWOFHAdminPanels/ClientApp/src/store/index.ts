import {combineReducers } from "redux"
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {authorizeReduser} from "./Reducers/AuthReducer/authorizeReducer"
// import { rootReduser} from "./rootReduser"

declare global {
    interface Window { store: any; }
}

export const rootReduser = combineReducers({
    authorize:authorizeReduser
})

export type appStateType = ReturnType<typeof rootReduser>
export type ThunkActionType<A extends Action ,R> = ThunkAction<R, appStateType, unknown, A>;
export type InfoActionsTypes<T> = T extends {[key:string] : (...args:any[])=>infer U} ? U : never;

export const store = configureStore(
    {reducer:rootReduser,
        middleware: [thunk],
    })

//  export const store = createStore(rootReduser,applyMiddleware(thunk))

window.store = store