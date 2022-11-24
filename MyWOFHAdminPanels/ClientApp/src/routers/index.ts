import React from "react"
import Counter from "../components/Counter"
import  Login  from "../components/Login"
import  Register  from "../components/Registration"

export enum RoutersNames {
    Login = '/',
    Registration = '/Registration',
    Counter = '/Counter',
}

export interface IRoute {
    path: string
    component: React.ComponentType
    exact?: boolean
    key: string
}

export const publicRouters: IRoute[] = [
    {path:RoutersNames.Login, exact:true, component:Login, key:RoutersNames.Login},
    {path:RoutersNames.Registration, exact:true, component:Register, key:RoutersNames.Registration},
]

export const privateRouters: IRoute[] = [
    {path:RoutersNames.Login, exact:true, component:Login, key:RoutersNames.Login},
    {path:RoutersNames.Registration, exact:true, component:Register, key:RoutersNames.Registration},
    {path:RoutersNames.Counter, exact:true, component:Counter, key:RoutersNames.Counter}
]