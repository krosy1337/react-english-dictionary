import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "./Header"
import {Container} from "@mui/material"

const Layout = () => {
    return (
        <>
            <Header />
            <Container sx={{paddingTop: 12}}>
                <Outlet />
            </Container>
        </>
    )
}

export default Layout