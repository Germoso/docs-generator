import { createUserIfDontExist } from "@/firebase/db"
import { useAuth } from "@/hooks/useAuth"
import { useUserModel } from "@/hooks/useUserModel"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const Onboarding = () => {
    const credentials = useAuth()
    const { user, setUser } = useUserModel()
    const router = useRouter()

    useEffect(() => {
        switch (credentials.status) {
            case -1:
                router.push("/auth/signup")
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
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    createUserIfDontExist(user.uid, user).then((created) => {
                        if (created) {
                            router.push("/home")
                        }
                    })
                }}
            >
                <input type="text" placeholder="Type your username" value={user.displayName} />
                <button>REGISTRAR</button>
                <span>By clicking "Continue", you agree to our Terms.</span>
            </form>
        </div>
    )
}

export default Onboarding
