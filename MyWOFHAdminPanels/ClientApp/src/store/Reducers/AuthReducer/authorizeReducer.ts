import { Dispatch } from "redux";
import { InfoActionsTypes, ThunkActionType } from "../..";
import { loginAPI } from "../../../Services/loginAPI";
import { IsigIn } from "../../../types/types";
import { authorizeActionsTypes } from "./Actions/authorizeActions";
import { AuthActions } from "./ActionsCreaters/authorizeActionCreaters";

export interface authorizeReduserState{
    isAuthorize: boolean;
    spinValue: boolean;
}

export const initiaAuthlState: authorizeReduserState = {
    isAuthorize: false,
    spinValue: false
}

export type AuthThunkType = InfoActionsTypes<typeof AuthActions>;
export type ThunkTypeAction = ThunkActionType<AuthThunkType, Promise<void>>;

export const authorizeReduser = (state = initiaAuthlState, action:AuthThunkType): authorizeReduserState => {
    switch (action.type) {
        case authorizeActionsTypes.CHANGE_ISAUTHORIZE:
            console.log('state: ', state)
            console.log('action: ', action)
            return { ...state, isAuthorize: action.flag }
        case authorizeActionsTypes.CHANGE_SPIN:
            return {...state, spinValue: action.flag}
        default:
            return state
    }
}

export const AuthActionsThunk = {
    login:(signInData:IsigIn):ThunkTypeAction => {
        return async (dispatch:Dispatch) => {
            dispatch(AuthActions.loginSpinChange(true))
            const data = await loginAPI.signIn(signInData);
            if(data.flag){
                loginAPI.setLocalStorage(data.token)
            }
            console.log('data: ', data)
            dispatch(AuthActions.setIsAuthenticatedChek(data.flag));
            dispatch(AuthActions.loginSpinChange(false))
        }
    },

    isAuthenticatedChek:():ThunkTypeAction => {
        return async (dispatch:Dispatch) => {
            const data = await loginAPI.isAuthenticatedChek();
            dispatch(AuthActions.setIsAuthenticatedChek(data))
        }
    }
}