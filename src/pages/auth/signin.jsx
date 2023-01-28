import Link from "next/link"
import React, { useEffect, useId } from "react"
import useUserAuth from "../../hooks/useUserAuth"
import { useRouter } from "next/router"
import { googleAuth, logOut } from "../../firebase/auth"
import Button from "@/components/Button"
import GoogleLogo from "../../components/Logos/GoogleLogo"
import TypedEffect from "@/components/TypedEffect"
import { userExist } from "@/firebase/db"

const Login = () => {
    const { status, user } = useUserAuth()
    const router = useRouter()

    useEffect(() => {
        if (status === 1) {
            userExist(user.uid)
                .then((exist) => {
                    console.log(exist)
                    if (exist) {
                        router.push("/home")
                    } else {
                        logOut()
                        router.push("/auth/signup")
                    }
                })
                .catch((error) => console.log(error))
        }
    }, [status])

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
                            googleAuth().catch((err) => console.log(err))
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
