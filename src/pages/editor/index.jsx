import dynamic from "next/dynamic"
const TextEditor = dynamic(() => import("../../components/Editor"), { ssr: false })

export default function Editor({ data }) {
    console.log(data)
    return (
        <>
            <TextEditor initialData={data} />
        </>
    )
}

export async function getServerSideProps(context) {
    const { prompt } = context.query
    console.log(prompt)
    if (prompt) {
        try {
            const response = await fetch("https://docs-generator-nine.vercel.app/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: prompt }),
            })

            const data = await response.json()
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`)
            }
            return {
                props: {
                    data,
                },
            }
        } catch (error) {
            console.error(error)
            return {
                props: {
                    error: error.message,
                },
            }
        }
    } else {
        return {
            props: {
                data: {},
            },
        }
    }
}
