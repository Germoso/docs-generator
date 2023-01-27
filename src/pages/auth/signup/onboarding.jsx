import Button from "@/components/Button"
import Input from "@/components/Input"
import { createUserIfDontExist, updateUserDisplayName } from "@/firebase/db"
import { useAuth } from "@/hooks/useAuth"
import { useUserModel } from "@/hooks/useUserModel"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const Onboarding = () => {
    const [inputValue, setInputValue] = useState("")
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
                setInputValue(displayName)
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
                    updateUserDisplayName(user.uid, inputValue)
                    router.push("/home")
                }}
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                />
                <Button type="secondary">Registrar</Button>
                <span>By clicking "Continue", you agree to our Terms.</span>
            </form>
        </div>
    )
}

export default Onboarding
