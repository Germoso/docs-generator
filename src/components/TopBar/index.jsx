import { useRouter } from "next/router"
import React from "react"
import Button from "../Button"

const TopBar = () => {
    const router = useRouter()
    return (
        <div className="fixed top-0 left-0 w-full z-[999] ">
            <div className="container mx-auto w-full flex justify-between">
                <Button
                    type="tertiary"
                    className="block font-semibold text-2xl px-2 py-2"
                    onClick={() => router.push("/")}
                >
                    docu.ai
                </Button>
                <Button
                    type="tertiary"
                    className={"hover:underline text-base"}
                    onClick={() => router.push("/auth/signin")}
                >
                    Sign In
                </Button>
            </div>
        </div>
    )
}

export default TopBar
