import React from 'react'
import {AppBar, Button, Container, Stack, Typography} from "@mui/material"
import {RouteNames} from "types/routes"
import CustomLink from "components/UI/CustomLink"
import {useLocation} from "react-router-dom"
import {AnimateSharedLayout} from "framer-motion"
import {useActions, useAppSelector} from "hooks/redux"

const Header = () => {
    const {pathname} = useLocation()
    const {user, isLoading} = useAppSelector(state => state.user)
    const {logoutUser} = useActions()

    const logout = () => {
        logoutUser()
    }
    return (
        <AppBar sx={{height: 70}}>
            <Container sx={{height: '100%', display: 'flex', alignItems: 'center'}}>
                <Stack flexDirection="row" alignItems="center" columnGap={1} sx={{marginLeft: "auto",}}>
                    {!isLoading && <AnimateSharedLayout>
                        {
                            user
                                ?
                                <>
                                    <CustomLink to={RouteNames.ROOT}
                                                isActive={pathname === `${RouteNames.ROOT}`}>Home</CustomLink>

                                    <CustomLink to={RouteNames.PROFILE}
                                                isActive={pathname === `${RouteNames.PROFILE}`}>
                                        <Typography
                                            sx={{maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis",}}
                                            lineHeight="inherit">Dictionary</Typography>
                                    </CustomLink>
                                </>
                                :
                                <>
                                    <CustomLink to={RouteNames.LOGIN}
                                                isActive={pathname === RouteNames.LOGIN}>Login</CustomLink>
                                    <CustomLink to={RouteNames.REGISTER}
                                                isActive={pathname === RouteNames.REGISTER}>Register</CustomLink>
                                </>
                        }

                    </AnimateSharedLayout>}
                    {
                        user
                        &&
                        <Button sx={{color: 'primary.contrastText'}} onClick={logout}>Logout</Button>
                    }
                </Stack>
            </Container>
        </AppBar>
    )
}

export default Header