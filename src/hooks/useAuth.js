import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/auth"

const STATUS = {
    UNKNOWN: -1,
    LOADING: 0,
    LOGGED: 1,
}

export const useAuth = () => {
    const [status, setStatus] = useState(STATUS.LOADING)
    const [user, setUser] = useState({})

    useEffect(() => {
        onAuthStateChanged(auth, (credentials) => {
            if (credentials) {
                setUser(credentials)
                setStatus(STATUS.LOGGED)
            } else {
                setUser({
                    photoURL: "",
                })
                setStatus(STATUS.UNKNOWN)
            }
            console.log(credentials)
        })
    }, [])

    return { user, status }
}
