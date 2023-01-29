import { useRouter } from "next/router"
import React from "react"
import Button from "../Button"

const TopBar = () => {
    const router = useRouter()
    return (
        <div className="fixed w-full z-[999] flex justify-between">
            <Button type="tertiary" className="block font-semibold text-2xl px-2 py-2" onClick={() => router.push("/")}>
                docu.ai
            </Button>
            <Button type="tertiary" className={"hover:underline text-base"} onClick={() => router.push("/auth/signin")}>
                Sign In
            </Button>
        </div>
    )
}

export default TopBar
