import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "./Header"
import {Container} from "@mui/material"

const Layout = () => {
    return (
        <>
            <Header />
            <Container sx={{paddingTop: {xs: 10, md: 12}}}>
                <Outlet />
            </Container>
        </>
    )
}

export default Layout