import { addTokensToUser } from "@/firebase/addTokensToUser"
import useUserAuth from "@/hooks/useUserAuth"
import React, { useEffect } from "react"

const Tokens = () => {
    const { user, status, setUser } = useUserAuth()

    useEffect(() => {
        console.log(user)
    }, [status])

    return (
        <div>
            <button
                onClick={() => {
                    addTokensToUser(user.uid, 1020)
                }}
            >
                Add 1000 tokens
            </button>
        </div>
    )
}

export default Tokens
