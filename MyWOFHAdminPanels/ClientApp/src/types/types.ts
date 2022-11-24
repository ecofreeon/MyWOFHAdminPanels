import {Action} from "redux"
import {ThunkAction} from 'redux-thunk'
import { store } from "../store";
import { appStateType } from "../store/rootReduser";

export interface IsigIn{
    login:string;
    password:string
}

export interface signInRequestType{
    flag: boolean;
    token: string;
    answer?: string;
}


export type ThunkActionType<A extends Action ,R> = ThunkAction<R, appStateType, unknown, A>;
export type InfoActionsTypes<T> = T extends {[key:string] : (...args:any[])=>infer U} ? U : never;