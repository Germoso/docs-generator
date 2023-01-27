import { useEffect } from "react"
import { useRouter } from "next/router"
import { signUpWithGoogle } from "@/firebase/auth"
import { useAuth } from "@/hooks/useAuth"

const Signup = () => {
    const credentials = useAuth()
    const router = useRouter()
    useEffect(() => {
        switch (credentials.status) {
            case 1:
                router.push("signup/onboarding")
            default:
                break
        }
    }, [credentials.status])

    return (
        <div>
            <button onClick={signUpWithGoogle}>Register with google</button>
        </div>
    )
}

export default Signup
