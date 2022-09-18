import React, {FC} from 'react'
import {Navigate} from 'react-router-dom'
import {RouteNames} from "types/routes"
import {CircularProgress, Typography} from "@mui/material"
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
                        <Typography variant="h1" fontWeight={700} sx={{fontSize: {xs: "1.5rem", sm: "3rem",}}}>
                            Hello, {user.displayName}
                        </Typography>
                        <WordsList />
                    </>
                    :
                    <Navigate to={RouteNames.LOGIN}/>
            }
        </>
    )
}

export default HomePage