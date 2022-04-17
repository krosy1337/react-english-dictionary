import {configureStore} from "@reduxjs/toolkit"
import userReducer from "store/slices/userSlice"

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user/currentAuth/fulfilled', 'user/auth/fulfilled'],
                ignoredPaths: ['user.user']
            }
        }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch