import { useEffect } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { privateRouters, publicRouters, RoutersNames } from "../routers"


export const AppRouter = () => {

    const store = useTypedSelector(store => store)

    useEffect(() => {
        console.log('isAuthorize ', store.authorize.isAuthorize)
        console.log('privateRouters ', privateRouters)
    }, [])

    return (
        store.authorize.isAuthorize ?
            <Switch>
                {privateRouters.map(route =>
                    <Route {...route}
                    />
                )}
                <Redirect to={RoutersNames.Counter} />
            </Switch>
            :
            <Switch>
                {publicRouters.map(route =>
                    <Route {...route} />)}
                <Redirect to={RoutersNames.Login} />
            </Switch>
    )
}