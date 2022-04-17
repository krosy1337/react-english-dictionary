import {IUser} from "types/user"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IDictionary} from "types/dictionary"
import {User} from "firebase/auth"
import {addWord, authCurrentUser, authUser, deleteWords, logoutUser} from "./actionCreators"

const initialState: IUser = {
    user: null,
    dictionary: null,
    isLoading: true,
    error: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [authUser.fulfilled.type]: (state, action: PayloadAction<{ user: User, dictionary: IDictionary }>) => {
            state.user = action.payload.user
            state.dictionary = action.payload.dictionary
            state.isLoading = false
        },
        [authUser.pending.type]: (state) => {
            state.error = ''
            state.isLoading = true
        },
        [authUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
        },
        [authCurrentUser.fulfilled.type]: (state, action: PayloadAction<{ user: User, dictionary: IDictionary }>) => {
            state.user = action.payload.user
            state.dictionary = action.payload.dictionary
            state.isLoading = false
        },
        [authCurrentUser.pending.type]: (state) => {
            state.error = ''
            state.isLoading = true
        },
        [authCurrentUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
        },
        [logoutUser.fulfilled.type]: (state) => {
            state.user = null
            state.dictionary = null
            state.error = ''
            state.isLoading = false
        },
        [logoutUser.pending.type]: (state) => {
            state.error = ''
            state.isLoading = true
        },
        [logoutUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
        },
        [addWord.fulfilled.type]: (state, action: PayloadAction<IDictionary>) => {
            state.dictionary = action.payload
        },
        [deleteWords.fulfilled.type]: (state, action: PayloadAction<IDictionary>) => {
            state.dictionary = action.payload
        },
    },
})

export default userSlice.reducer