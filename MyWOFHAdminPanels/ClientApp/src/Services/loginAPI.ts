import { generalAPI } from './generalarAPI.js';
import { IsigIn, signInRequestType } from '../types/types.js';

var request = require('../request.js');

export var loginAPI = {

    signIn: async (signInData: IsigIn) => {
        console.log("signInData: ", signInData)
        let requestResult: signInRequestType = await request.useQuery(signInData, 'Autorize', 'LogIn').then((Request: any) => {
            if (Request.flag) {
                return { flag: true, token: Request.token };
            }
            else {
                generalAPI.showNotificationError("Ошибка входа", Request.answer)
                return false;
            }
        })

        return requestResult
    },

    //    register: (signInData) => {
    //        request.useQuery(signInData, 'Autorize', 'LogIn').then(Request => {
    //            if (Request.Flag) {
    //                return true;
    //            }
    //            else {
    //                console.log(this)
    //                generalAPI.showNotificationError("Ошибка входа", Request.result[0].description)
    //            }
    //        })
    //    },

    isAuthenticatedChek: async () => {
        let retVal = await request.useQuery(null, 'Autorize', 'AuthorizeCheck').then((Request: any) => {
            return Request.flag
        })
        return retVal
    },

    setLocalStorage: (token: string) => {
        localStorage.setItem("token", token)
    }

}
