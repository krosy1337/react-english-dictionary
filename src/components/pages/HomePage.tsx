import React, {FC} from 'react'
import {Navigate} from 'react-router-dom'
import {RouteNames} from "types/routes"
import {CircularProgress} from "@mui/material"
import WordsList from "components/WordsList"
import {useAppSelector} from "hooks/redux"

const HomePage: FC = () => {
    const {user, isLoading} = useAppSelector(state => state.user)
    if (isLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress />
            </div>
        )
    }
    return (
        <>
            {
                user
                    ?
                    <>
                        <h1>Hello, {user.displayName}</h1>
                        <WordsList />
                    </>
                    :
                    <Navigate to={RouteNames.LOGIN}/>
            }
        </>
    )
}

export default HomePage