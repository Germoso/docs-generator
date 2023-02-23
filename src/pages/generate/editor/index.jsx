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
import { addDocument, debit } from "@/firebase/db"

export default function Editor({ prompt, details = "", type, maxTokens }) {
    const { user } = useUserAuth()
    const [data, setData] = useState()
    const [tokens, setTokens] = useState(0)
    let rowData = ""
    maxTokens = Number(maxTokens)

    useEffect(() => {
        const id = user.uid
        if (prompt && id) {
            console.log(user)
            generateData(introductionStructure(prompt)).then((data) => {
                console.log(data)
                debit(id, data.usage.total_tokens)
                setTokens((prev) => prev + data.usage.total_tokens)

                generateData(requestStructure(data.result, details), maxTokens).then((data) => {
                    console.log(data)
                    rowData = rowData.concat("\n", data.result)
                    debit(id, data.usage.total_tokens)
                    setTokens((prev) => prev + data.usage.total_tokens)

                    generateData(bodyStructure(prompt)).then((data) => {
                        console.log(data)
                        debit(id, data.usage.total_tokens)
                        setTokens((prev) => prev + data.usage.total_tokens)

                        generateData(requestStructure(data.result, details), maxTokens).then((data) => {
                            console.log(data)
                            rowData = rowData.concat("\n", data.result)
                            debit(id, data.usage.total_tokens)
                            setTokens((prev) => prev + data.usage.total_tokens)

                            generateData(conclusionStructure(prompt, details)).then((data) => {
                                console.log(data)
                                debit(id, data.usage.total_tokens)
                                setTokens((prev) => prev + data.usage.total_tokens)

                                generateData(requestStructure(data.result, details), maxTokens).then((data) => {
                                    console.log(data)
                                    setTokens((prev) => prev + data.usage.total_tokens)
                                    rowData = rowData.concat("\n", data.result)
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
            <Layout user={user}>
                <div className="px-4 mt-4">
                    <TextEditor
                        data={data}
                        user={user}
                        generateSave
                        createDoc={(content) => {
                            console.log(content)
                            addDocument({ id: user.uid, prompt, details, type, total_tokens: tokens, content })
                        }}
                        mode="generate"
                    />
                </div>
            </Layout>
        </>
    )
}

export async function getServerSideProps(context) {
    const { prompt, details, type, maxTokens } = context.query

    return {
        props: {
            prompt: prompt ? prompt : false,
            details: details || "",
            type,
            maxTokens,
        },
    }
}
