import {createContext, FC, useContext, useEffect, useState} from "react"
import {onAuthStateChanged, User} from "firebase/auth"
import {auth, database} from "firebaseConfig"
import {ref, get, child} from "firebase/database"
import {IDictionary} from "./types/dictionary"

interface IContext {
    user: User | null
    dictionary: IDictionary | null
    isLoading: boolean
}

const Context = createContext({} as IContext)

const AppContext: FC = ({children}) => {
    const [user, setUser] = useState<User | null>(null)
    const [dictionary, setDictionary] = useState<IDictionary | null>(null)
    const [isLoading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            setLoading(true)
            setUser(user)
            const dbRef = ref(database)
            try {
                const snapshot = await get(child(dbRef, `dictionaries/${user?.uid}`))
                const dictionary = snapshot.val()
                setDictionary(dictionary)
            } catch (e) {
                console.log('Error')
            }
            finally {
                setLoading(false)
            }
        })
    }, [])
    return (
        <Context.Provider value={{user, isLoading, dictionary}}>
            {children}
        </Context.Provider>
    )
}

export default AppContext

export const AppState = () => {
    return useContext(Context)
}