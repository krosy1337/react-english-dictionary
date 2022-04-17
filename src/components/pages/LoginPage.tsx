import React, {FC} from 'react'
import AuthForm from "components/UI/AuthForm"
import {RouteNames} from "types/routes"
import {useActions} from "hooks/redux"
import {AuthTypesEnum} from "types/user"

const LoginPage: FC = () => {
    const {authUser} = useActions()
    const authHandler = async (email: string, password: string) => {
        authUser({email, password, authType: AuthTypesEnum.LOGIN})
    }

    return (
        <AuthForm title="LOGIN" footerLink={RouteNames.REGISTER} footerLinkText="Create an account"
                  authHandler={authHandler}/>
    )
}

export default LoginPage