import React, {FC, useEffect, useState} from 'react'
import {Navigate, useRoutes} from "react-router-dom"
import Layout from "components/layout/Layout"
import {RouteNames} from "types/routes"
import LoginPage from "components/pages/LoginPage"
import RegisterPage from 'components/pages/RegisterPage'
import HomePage from "components/pages/HomePage"
import ProfilePage from "./components/pages/ProfilePage"
import {useActions} from "./hooks/redux"
import {auth} from "./firebaseConfig"
import {onAuthStateChanged} from "firebase/auth"

const App: FC = () => {
    const [isLoaded, setLoaded] = useState<boolean>(false)
    const {authCurrentUser} = useActions()
    useEffect(() => {
        if (isLoaded) {
            authCurrentUser()
        }
    }, [isLoaded])
    useEffect(() => {
        onAuthStateChanged(auth, () => {
            setLoaded(true)
        })
    }, [])
    const routes = useRoutes([
        {
            path: RouteNames.ROOT,
            element: <Layout/>,
            children: [
                {
                    path: RouteNames.LOGIN,
                    element: <LoginPage/>,
                },
                {
                    path: RouteNames.REGISTER,
                    element: <RegisterPage/>,
                },
                {
                    path: RouteNames.ROOT,
                    element: <HomePage/>
                },
                {
                    path: RouteNames.PROFILE,
                    element: <ProfilePage/>
                },
                {
                    path: '*',
                    element: <Navigate to={RouteNames.ROOT}/>
                },
            ]
        }
    ])

    return (
        <>
            {routes}
        </>
    )
}

export default App
