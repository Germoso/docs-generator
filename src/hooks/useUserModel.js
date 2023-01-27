import { useState } from "react"

export const useUserModel = () => {
    const [user, setUser] = useState({
        uid: undefined,
        displayName: undefined,
        email: undefined,
        photoURL: undefined,
        tokens: 0,
    })
    return { user, setUser }
}
