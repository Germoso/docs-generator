import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "@/firebase/auth"
import { userExist } from "@/firebase/db"

const STATUS = {
    UNKNOWN: -1,
    LOADING: 0,
    LOGGED: 1,
}

const useUserAuth = (onLoading = () => {}, onUnknown = () => {}, onResolve = () => {}) => {
    const [status, setStatus] = useState(STATUS.LOADING)
    const [userAuthData, setUserAuthData] = useState({
        uid: "undefined",
        displayName: "undefined",
        email: "undefined",
        photoURL: "",
        tokens: 0,
    })
    const [user, setUser] = useState({})
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
                setUserAuthData({
                    ...userAuthData,
                    displayName,
                    uid,
                    email,
                    photoURL,
                })
                setStatus(STATUS.LOGGED)
                userExist(uid).then((res) => {
                    console.log(res)
                    setUser(res.user)
                })
            } else {
                setUserAuthData({
                    photoURL: "",
                })
                setStatus(STATUS.UNKNOWN)
            }
        })
    }, [])

    return { userAuthData, status, user }
}

export default useUserAuth
