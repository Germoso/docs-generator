import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { googleAuth } from "../../firebase/auth"
import Button from "@/components/Button"
import GoogleLogo from "../../components/Logos/GoogleLogo"
import TypedEffect from "@/components/TypedEffect"

const Login = () => {
    const user = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (user.status === 1) {
            router.replace("/home")
        }
    }, [user])

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-6">
            <h1 className="text-2xl text-center uppercase font-extrabold">
                <TypedEffect texts={["Welcome Back"]} cursor={false} speed={40} />
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
                        Login with Google
                    </Button>
                </form>
                <span className="text-sm block text-center">
                    Already have an account?{" "}
                    <Link href={"/auth/signup"} className="text-black">
                        Sign up
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default Login
