import React, {ChangeEvent, FC, FormEvent, forwardRef, PropsWithChildren, useEffect, useState} from 'react'
import {
    Alert,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Snackbar,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material"
import {motion} from "framer-motion"
import {Link, Navigate} from 'react-router-dom'
import {RouteNames} from "types/routes"
import {LoadingButton} from "@mui/lab"
import {useAppSelector} from "hooks/redux"

interface AuthFormProps {
    title: string
    footerText?: string
    footerLink: string
    footerLinkText: string
    authHandler: (email: string, password: string, name?: string) => void
    isNameField?: boolean
}

const FormHeader: FC<{ text?: string }> = ({text}) => {
    return (
        <Typography variant="h5" component="span" color="primary" fontWeight="fontWeightLight">{text}</Typography>
    )
}

const RawForm = forwardRef<HTMLDivElement, PropsWithChildren<AuthFormProps>>((
    {title, footerLinkText, footerText, footerLink, authHandler, isNameField}, ref) => {
    const [emailField, setEmailField] = useState<string>('')
    const [passwordField, setPasswordField] = useState<string>('')
    const [nameField, setNameField] = useState<string>('')
    const [alert, setAlert] = useState<boolean>(false)
    const {isLoading, error} = useAppSelector(state => state.user)

    const theme = useTheme()

    useEffect(() => {
        if (error) {
            setAlert(true)
        } else {
            setAlert(false)
        }
    }, [error])

    const formSubmitHandler = async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (isNameField) {
            await authHandler(emailField, passwordField, nameField)
            return
        }
        await authHandler(emailField, passwordField)
    }
    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailField(e.currentTarget.value)
    }
    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordField(e.currentTarget.value)
    }
    const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNameField(e.currentTarget.value)
    }

    return (
        <>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      open={alert} autoHideDuration={3000} onClose={() => setAlert(false)}>
                <Alert onClose={() => setAlert(false)} severity="error">
                    {error}
                </Alert>
            </Snackbar>
            <Card ref={ref} variant="outlined"
                  sx={{maxWidth: 600, margin: 'auto', backgroundColor: 'primary.contrastText'}}>
                <Box component="form" onSubmit={formSubmitHandler}>
                    <CardHeader title={<FormHeader text={title}/>}/>
                    <CardContent>
                        <Stack rowGap={2}>
                            {isNameField &&
                                <div><TextField name="name" type="text" label="Name" fullWidth required
                                                value={nameField} onChange={nameChangeHandler}/></div>}
                            <div><TextField name="email" type="email" label="Email" fullWidth required
                                            value={emailField} onChange={emailChangeHandler}/></div>
                            <div><TextField name="password" type="password" label="Password" fullWidth required
                                            value={passwordField} onChange={passwordChangeHandler}/></div>
                        </Stack>
                    </CardContent>
                    <CardActions sx={{flexDirection: 'column', alignItems: 'start'}}>
                        <LoadingButton loading={isLoading} disabled={isLoading} type="submit" variant="contained"
                                       color="primary" sx={{fontSize: 18}}>Submit</LoadingButton>
                        <Typography sx={{marginTop: 2}}>
                            {footerText}
                            <Link to={footerLink}
                                  style={{color: theme.palette.primary.light}}>
                                {footerLinkText}
                            </Link>
                        </Typography>
                    </CardActions>
                </Box>
            </Card>
        </>

    )
})

const MotionForm = motion(RawForm)

const AuthForm: FC<AuthFormProps> = (props) => {
    const {user} = useAppSelector(state => state.user)

    const variants = {
        hidden: {
            opacity: 0,
            y: 100,
            scale: 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
        }
    }

    return (
        <>
            {user ? <Navigate to={RouteNames.ROOT}/> :
                <MotionForm initial="hidden" animate="visible" variants={variants} {...props}/>}
        </>

    )
}

export default AuthForm