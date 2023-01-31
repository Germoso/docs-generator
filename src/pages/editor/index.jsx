import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
const TextEditor = dynamic(() => import("../../components/Editor"), { ssr: false })
import useUserAuth from "@/hooks/useUserAuth"
import {
    bodyStructure,
    requestStructure,
    introductionStructure,
    conclusionStructure,
} from "@/utils/TypeOfDocuments/essay"
import Layout from "@/components/Layout"
import generateData from "@/utils/generateData"
import { text } from "./text"
import { debit } from "@/firebase/db"

export default function Editor({ prompt, details }) {
    const [generated, setGenerated] = useState(false)
    const { user } = useUserAuth()
    const [data, setData] = useState()
    const [usedTokens, setusedTokens] = useState(0)
    let rowData = ""

    useEffect(() => {
        console.log(usedTokens)
    }, [generated])

    useEffect(() => {
        const id = user.uid
        if (prompt && id) {
            console.log(user)
            generateData(introductionStructure(prompt)).then((data) => {
                console.log(data)
                setusedTokens((prev) => prev + data.usage.total_tokens)
                debit(id, data.usage.total_tokens)
                generateData(requestStructure(data.result, details)).then((data) => {
                    console.log(data)
                    setusedTokens((prev) => prev + data.usage.total_tokens)
                    rowData = rowData.concat("\n", data.result)
                    debit(id, data.usage.total_tokens)

                    generateData(bodyStructure(prompt)).then((data) => {
                        console.log(data)
                        setusedTokens((prev) => prev + data.usage.total_tokens)
                        debit(id, data.usage.total_tokens)

                        generateData(requestStructure(data.result, details)).then((data) => {
                            console.log(data)
                            rowData = rowData.concat("\n", data.result)
                            setusedTokens((prev) => prev + data.usage.total_tokens)
                            debit(id, data.usage.total_tokens)

                            generateData(conclusionStructure(prompt, details)).then((data) => {
                                console.log(data)
                                setusedTokens((prev) => prev + data.usage.total_tokens)
                                debit(id, data.usage.total_tokens)

                                generateData(requestStructure(data.result, details)).then((data) => {
                                    console.log(data)
                                    setusedTokens((prev) => prev + data.usage.total_tokens)
                                    rowData = rowData.concat("\n", data.result)
                                    setData(rowData)
                                    setGenerated(true)
                                    debit(id, data.usage.total_tokens)
                                })
                            })
                        })
                    })
                })
            })
        }
    }, [user])

    return (
        <>
            <Layout user={user} />
            <div className="px-4 mt-4">
                <TextEditor data={prompt ? data : text} />
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { prompt, details } = context.query

    return {
        props: {
            prompt: prompt ? prompt : false,
            details: details,
        },
    }
}
