import { authorizeActionsTypes } from '../Actions/authorizeActions';

export const AuthActions = {
    setIsAuthenticatedChek: (flag:boolean) =>({type:authorizeActionsTypes.CHANGE_ISAUTHORIZE, flag} as const),
    loginSpinChange: (flag:boolean) =>({type:authorizeActionsTypes.CHANGE_SPIN, flag} as const)
}