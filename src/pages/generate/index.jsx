import Button from "@/components/Button"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import useUserAuth from "@/hooks/useUserAuth"
import Navbar from "../../components/Navbar"

const Generate = ({ type }) => {
    const [prompt, setPrompt] = useState("")
    const [tokensAmount, setTokensAmount] = useState(3500)
    const router = useRouter()
    const [details, setDetails] = useState("")
    const { user, status } = useUserAuth()

    useEffect(() => {
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

    useEffect(() => {
        console.log(tokensAmount)

        return () => {}
    }, [tokensAmount])

    return (
        <div className="flex flex-col h-screen">
            <Navbar user={user} />

            <div className="flex flex-col grow items-center justify-center w-full px-4">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        router.push({
                            pathname: "editor",
                            query: {
                                prompt: prompt,
                                tokens: tokensAmount,
                                details: details,
                            },
                        })
                    }}
                    className="flex flex-col items-center gap-1"
                >
                    <div className="w-full">
                        <h1 className="uppercase font-extrabold text-lg text-left w-full">
                            Enter your {type} topic here
                        </h1>
                        <input
                            className="pl-2 py-2 border-2 border-solid w-full border-black rounded-md text-lg focus:outline-none font-semibold mt-1 "
                            type="text"
                            value={prompt}
                            onChange={(e) => {
                                setPrompt(e.target.value)
                            }}
                            placeholder="The machine learning..."
                        />
                    </div>
                    <div className="w-full">
                        <h2 className="uppercase font-extrabold text-base w-full text-left">Additional details</h2>
                        <textarea
                            cols="30"
                            rows="10"
                            placeholder={`Requeriments (optional) \n-Talk about...`}
                            className="pl-2 py-2 border-2 border-solid w-full border-black rounded-md text-lg focus:outline-none font-semibold mt-1 resize-none"
                            value={details}
                            onChange={(e) => {
                                setDetails(e.target.value)
                            }}
                        ></textarea>
                    </div>
                    <div className="w-full">
                        <h2 className="uppercase font-extrabold text-base w-full text-left">
                            Letter Pieces {tokensAmount}
                        </h2>
                        <input
                            className="accent-black w-full"
                            type="range"
                            onChange={(e) => {
                                setTokensAmount(e.target.value)
                            }}
                            value={tokensAmount}
                            min={2000}
                            max={3500}
                        />
                    </div>
                    <Button type="secondary" className={"text-xs mt-4 font-semibold w-full shadow-xl"}>
                        Generate
                    </Button>
                </form>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ query }) => {
    return {
        props: {
            type: query.t || "essay",
        },
    }
}

export default Generate
