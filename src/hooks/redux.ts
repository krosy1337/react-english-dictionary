import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import {authUser, authCurrentUser, logoutUser, addWord, deleteWords} from "store/slices/actionCreators"
import {userSlice} from "store/slices/userSlice"
import { bindActionCreators } from "@reduxjs/toolkit";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const actionCreators = {
    authUser,
    authCurrentUser,
    logoutUser,
    addWord,
    deleteWords,
    ...userSlice.actions,
}

export const useActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(actionCreators, dispatch)
}