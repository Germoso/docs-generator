import useUserAuth from "@/hooks/useUserAuth"
import React, { useEffect, useState } from "react"

import Layout from "@/components/Layout"
import dynamic from "next/dynamic"
import { getDocument } from "@/firebase/db"

const TextEditor = dynamic(() => import("../../../components/Editor"), { ssr: false })

const Editor = ({ index }) => {
    const [data, setData] = useState()
    const { user } = useUserAuth()

    useEffect(() => {
        if (user.uid) {
            getDocument({ id: user.uid, index }).then((res) => {
                console.log(res.content.blocks)
                setData(res.content.blocks)
            })
        }
    }, [user])

    return (
        <>
            <Layout user={user} />
            <div className="px-4 mt-4">
                <TextEditor data={data} index={index} user={user} mode="edit" />
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { index } = context.query
    return {
        props: {
            index,
        },
    }
}

export default Editor
