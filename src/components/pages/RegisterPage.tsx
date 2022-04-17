import React, {FC} from 'react'
import AuthForm from "components/UI/AuthForm"
import {RouteNames} from "types/routes"
import {useActions} from "hooks/redux"
import {AuthTypesEnum} from "types/user"

const RegisterPage: FC = () => {
    const {authUser} = useActions()
    const authHandler = async (email: string, password: string, name?: string) => {
        await authUser({email, password, name, authType: AuthTypesEnum.REGISTER})
    }

    return (
        <AuthForm title="REGISTER" footerLink={RouteNames.LOGIN} isNameField
                  footerText="Already have an account? " footerLinkText="Sign in"
                  authHandler={authHandler}/>
    )
}

export default RegisterPage