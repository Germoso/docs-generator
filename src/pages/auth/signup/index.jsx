import { useEffect } from "react"
import { useRouter } from "next/router"
import TypedEffect from "@/components/TypedEffect"
import Button from "@/components/Button"
import GoogleLogo from "../../../components/Icons/GoogleLogo"
import Link from "next/link"
import useUserAuth from "@/hooks/useUserAuth"
import { createUserIfDontExist } from "@/firebase/db"
import { googleAuth } from "@/firebase/auth"

const Signup = () => {
    const { user, userAuthData, status } = useUserAuth()

    const router = useRouter()
    useEffect(() => {
        console.log(status)
        console.log(userAuthData)
        switch (status) {
            case 1:
                console.log(user.uid)
                createUserIfDontExist(userAuthData.uid, userAuthData)
                    .then((created) => {
                        console.log("CREATED")
                        console.log(created)
                        if (created) {
                            router.replace("/auth/signup/onboarding")
                        } else {
                            console.log("no creado")
                            router.replace("/auth/signin")
                        }
                    })
                    .catch((err) => console.log(err))
            default:
                break
        }
    }, [status, userAuthData])

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

                            googleAuth().catch((err) => console.log(err))
                        }}
                        className={"rounded-none flex items-center"}
                    >
                        <GoogleLogo className={"w-6"} />
                        Sign up with Google
                    </Button>
                </form>
                <span className="text-sm block text-center">
                    Already have an account?{" "}
                    <Link href={"/auth/signin"} className="text-black">
                        Sign in
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default Signup
