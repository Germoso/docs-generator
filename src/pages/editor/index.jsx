import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
const TextEditor = dynamic(() => import("../../components/Editor"), { ssr: false })

export default function Editor({ prompt }) {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch("https://docs-generator-nine.vercel.app/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: prompt }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setData(data.result)
            })
            .catch((error) => console.log(error))
    }, [])

    return (
        <>
            <TextEditor initialData={data} data={data} />
        </>
    )
}

export async function getServerSideProps(context) {
    const { prompt } = context.query
    console.log(prompt)
    return {
        props: {
            prompt,
        },
    }
}
