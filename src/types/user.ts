import {User} from "firebase/auth"
import {IDictionary} from "./dictionary"

export enum AuthTypesEnum {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
}

export type AuthTypes = AuthTypesEnum.LOGIN | AuthTypesEnum.REGISTER

export interface IUser {
    user: User | null
    dictionary: IDictionary | null
    isLoading: boolean
    error: string
}