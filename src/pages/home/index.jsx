import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { logOut } from "@/firebase/auth"
import { useAuth } from "@/hooks/useAuth"
import Navbar from "../../components/Navbar/index"

const Index = () => {
    const [user, setUser] = useState({
        uid: undefined,
        displayName: undefined,
        email: undefined,
        photoURL: undefined,
        tokens: 0,
    })
    const credentials = useAuth()
    const router = useRouter()

    useEffect(() => {
        switch (credentials.status) {
            case -1:
                router.push("/")
                break
            case 1:
                const { displayName, uid, email, photoURL } = credentials.user
                setUser({
                    ...user,
                    displayName,
                    uid,
                    email,
                    photoURL,
                })
                break
            default:
                break
        }
    }, [credentials.status])

    return (
        <div>
            <Navbar credentials={credentials} />
            <button onClick={logOut}>Log out</button>
            <button
                onClick={() => {
                    router.push("/account/billing/tokens")
                }}
            >
                Buy tokens
            </button>
        </div>
    )
}

export default Index
