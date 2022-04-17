import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material"
import {BrowserRouter} from "react-router-dom"
import {blueGrey, pink} from "@mui/material/colors"
import './firebaseConfig'
import {Provider} from "react-redux"
import {store} from "store/store"

const theme = createTheme({
    palette: {
        primary: pink,
        background: {
            default: blueGrey[50]
        }
    }
})

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <CssBaseline/>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
