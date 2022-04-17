import {createAsyncThunk} from "@reduxjs/toolkit"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth"
import {auth, database} from "firebaseConfig"
import {AuthTypes, AuthTypesEnum} from "types/user"
import {child, get, ref, set} from "firebase/database"
import {IDictionary, ITranslate} from "types/dictionary"
import {v4 as uuidv4} from 'uuid'
import {GridSelectionModel} from "@mui/x-data-grid"

export const authUser = createAsyncThunk(
    'user/auth',
    async ({email, password, name, authType}: { email: string, password: string, name?: string, authType: AuthTypes }, thunkApi) => {
        try {
            if (authType === AuthTypesEnum.LOGIN) {
                const {user} = await signInWithEmailAndPassword(auth, email, password)
                const dbRef = ref(database)
                const snapshot = await get(child(dbRef, `dictionaries/${user?.uid}`))
                const dictionary = snapshot.val()
                return {user, dictionary}
            }
            if (authType === AuthTypesEnum.REGISTER) {
                const {user} = await createUserWithEmailAndPassword(auth, email, password)
                if (name) {
                    await updateProfile(user, {
                        displayName: name,
                    })
                }
                const dbRef = ref(database)
                const snapshot = await get(child(dbRef, `dictionaries/${user?.uid}`))
                const dictionary = snapshot.val()
                return {user, dictionary}
            }
        } catch (e: any) {
            return thunkApi.rejectWithValue(e.code)
        }
    }
)

export const authCurrentUser = createAsyncThunk(
    'user/currentAuth',
    async (_, thunkApi) => {
        try {
            const {currentUser} = auth
            const dbRef = ref(database)
            const snapshot = await get(child(dbRef, `dictionaries/${currentUser?.uid}`))
            const dictionary = snapshot.val()
            return {user: currentUser, dictionary}
        } catch (e: any) {
            return thunkApi.rejectWithValue(e.code)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, thunkApi) => {
        try {
            await signOut(auth)
        } catch (e: any) {
            return thunkApi.rejectWithValue(e.code)
        }
    }
)

export const addWord = createAsyncThunk(
    'user/addWord',
    async ({word, translate}: {word: string, translate: string}, thunkApi) => {
        try {
            const {currentUser: user} = auth
            const snapshot = await get(child(ref(database), `dictionaries/${user?.uid}`))
            const dictionary = snapshot.val()
            let newDictionary: IDictionary
            if (dictionary) {
                newDictionary = [...dictionary, {id: uuidv4(), words: [{text: [word]}, {text: [translate]}]
            }]
            } else {
                newDictionary = [{id: uuidv4(), words: [{text: [word]}, {text: [translate]}]}]
            }
            await set(ref(database, `dictionaries/${user?.uid}`), newDictionary)
            return newDictionary
        } catch (e: any) {
            return thunkApi.rejectWithValue(e.code)
        }
    }
)

export const deleteWords = createAsyncThunk(
    'user/deleteWord',
    async (ids: GridSelectionModel, thunkApi) => {
        try {
            const {currentUser: user} = auth
            const snapshot = await get(child(ref(database), `dictionaries/${user?.uid}`))
            const dictionary = snapshot.val()
            let newDictionary: IDictionary
            if (dictionary) {
                newDictionary = dictionary.filter((t: ITranslate) => !ids.includes(t.id))
            } else {
                newDictionary = [] as IDictionary
            }
            await set(ref(database, `dictionaries/${user?.uid}`), newDictionary)
            return newDictionary
        } catch (e: any) {
            return thunkApi.rejectWithValue(e.code)
        }
    }
)