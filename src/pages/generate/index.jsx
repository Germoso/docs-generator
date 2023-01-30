import Button from "@/components/Button"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import useUserAuth from "@/hooks/useUserAuth"
import Navbar from "../../components/Navbar"

const Generate = ({ t }) => {
    const [prompt, setPrompt] = useState("")
    const router = useRouter()

    const { userAuthData, user, status } = useUserAuth()

    useEffect(() => {
        console.log(user)
        switch (status) {
            case -1:
                router.push("/")
                break
            case 1:
                break
            default:
                break
        }
    }, [status])

    return (
        <>
            <Navbar user={user} />

            <div className="flex flex-col items-center justify-center h-screen w-full px-4">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        console.log("e")
                        router.push({
                            pathname: "editor",
                            query: {
                                prompt: prompt,
                            },
                        })
                    }}
                    className="flex flex-col items-center"
                >
                    <h1 className="uppercase font-extrabold text-xl text-center">Enter your {t} topic here</h1>
                    <input
                        className="pl-2 py-2 border-2 border-solid w-full border-black rounded-md text-lg focus:outline-none font-semibold mt-1"
                        type="text"
                        value={prompt}
                        onChange={(e) => {
                            setPrompt(e.target.value)
                        }}
                    />
                    <Button type="secondary" className={"text-xs mt-4 font-semibold"}>
                        Generate
                    </Button>
                </form>
            </div>
        </>
    )
}

export const getServerSideProps = async ({ query }) => {
    return {
        props: {
            t: query.t,
        },
    }
}

export default Generate
