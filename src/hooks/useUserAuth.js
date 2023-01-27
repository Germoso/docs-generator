import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "@/firebase/auth"

const STATUS = {
    UNKNOWN: -1,
    LOADING: 0,
    LOGGED: 1,
}

const useUserAuth = (onLoading = () => {}, onUnknown = () => {}, onResolve = () => {}) => {
    const [status, setStatus] = useState(STATUS.LOADING)
    const [user, setUser] = useState({
        uid: undefined,
        displayName: undefined,
        email: undefined,
        photoURL: undefined,
        tokens: 0,
    })

    useEffect(() => {
        switch (status) {
            case 0:
                onLoading()
                break
            case -1:
                onUnknown()
            case 1:
                onResolve()
                break
            default:
                break
        }
    }, [status])

    useEffect(() => {
        onAuthStateChanged(auth, (credentials) => {
            if (credentials) {
                const { displayName, uid, email, photoURL } = credentials
                setUser({
                    ...user,
                    displayName,
                    uid,
                    email,
                    photoURL,
                })
                setStatus(STATUS.LOGGED)
            } else {
                setUser({
                    photoURL: "",
                })
                setStatus(STATUS.UNKNOWN)
            }
        })
    }, [])

    return { user, setUser, status }
}

export default useUserAuth
