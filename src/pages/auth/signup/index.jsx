import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/hooks/useAuth"
import TypedEffect from "@/components/TypedEffect"
import Button from "@/components/Button"
import GoogleLogo from "../../../components/Logos/GoogleLogo"
import Link from "next/link"
import useUserAuth from "@/hooks/useUserAuth"
import { createUserIfDontExist } from "@/firebase/db"
import { googleAuth } from "@/firebase/auth"

const Signup = () => {
    const { user, setUser, status } = useUserAuth()

    const router = useRouter()
    useEffect(() => {
        switch (status) {
            case 1:
                createUserIfDontExist(user.uid, user)
                    .then((created) => {
                        console.log(created)
                        if (created) {
                            router.push("signup/onboarding")
                        }
                    })
                    .catch((err) => console.log(err))
            default:
                break
        }
    }, [status])

    useEffect(() => {}, [])

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-6">
            <h1 className="text-2xl text-center uppercase font-extrabold">
                <TypedEffect texts={["create your account"]} cursor={false} speed={40} />
            </h1>
            <div>
                <form className="flex flex-col gap-2">
                    <Button
                        type="secondary"
                        onClick={(e) => {
                            e.preventDefault()
                            googleAuth()
                        }}
                        className={"rounded-none flex items-center"}
                    >
                        <GoogleLogo className={"w-6"} />
                        Sign up with Google
                    </Button>
                </form>
                <span className="text-sm block text-center">
                    Already have an account?{" "}
                    <Link href={"/auth/signup"} className="text-black">
                        Sign in
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default Signup