import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
const TextEditor = dynamic(() => import("../../../components/Editor"), { ssr: false })
import useUserAuth from "@/hooks/useUserAuth"
import {
    bodyStructure,
    requestStructure,
    introductionStructure,
    conclusionStructure,
} from "@/utils/TypeOfDocuments/essay"
import Layout from "@/components/Layout"
import generateData from "@/utils/generateData"
import { text } from "../../../utils/text"
import { addDocument, debit } from "@/firebase/db"

export default function Editor({ prompt, details = "", type }) {
    const { user } = useUserAuth()
    const [data, setData] = useState()
    const [tokens, setTokens] = useState(0)
    let rowData = ""

    useEffect(() => {
        if (data) {
            addDocument({ id: user.uid, prompt, text: data, type, total_tokens: tokens })
        }
    }, [data])

    useEffect(() => {
        const id = user.uid
        if (prompt && id) {
            console.log(user)
            generateData(introductionStructure(prompt)).then((data) => {
                console.log(data)
                debit(id, data.usage.total_tokens)
                setTokens((prev) => prev + data.usage.total_tokens)
                generateData(requestStructure(data.result, details)).then((data) => {
                    console.log(data)
                    rowData = rowData.concat("\n", data.result)
                    debit(id, data.usage.total_tokens)
                    setTokens((prev) => prev + data.usage.total_tokens)

                    generateData(bodyStructure(prompt)).then((data) => {
                        console.log(data)
                        debit(id, data.usage.total_tokens)
                        setTokens((prev) => prev + data.usage.total_tokens)

                        generateData(requestStructure(data.result, details)).then((data) => {
                            console.log(data)
                            rowData = rowData.concat("\n", data.result)
                            debit(id, data.usage.total_tokens)
                            setTokens((prev) => prev + data.usage.total_tokens)

                            generateData(conclusionStructure(prompt, details)).then((data) => {
                                console.log(data)
                                debit(id, data.usage.total_tokens)
                                setTokens((prev) => prev + data.usage.total_tokens)

                                generateData(requestStructure(data.result, details)).then((data) => {
                                    console.log(data)
                                    rowData = rowData.concat("\n", data.result)
                                    setTokens((prev) => prev + data.usage.total_tokens)
                                    setData(rowData)
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
                <button
                    onClick={() => {
                        addDocument({ id: user.uid, prompt, text: data, type, total_tokens: tokens })
                    }}
                >
                    Save data
                </button>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { prompt, details, type } = context.query

    return {
        props: {
            prompt: prompt ? prompt : false,
            details: details || false,
            type,
        },
    }
}