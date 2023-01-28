import Button from "@/components/Button"
import Input from "@/components/Input"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const Generate = ({ t }) => {
    const [prompt, setPrompt] = useState("")

    return (
        <div>
            <form className="flex flex-col items-center">
                <Input state={prompt} setState={setPrompt} />
                <Button type="secondary" className={"text-xs"}>
                    Generate
                </Button>
            </form>
        </div>
    )
}

export const getServerSideProps = async ({ query }) => {
    return {
        props: {
            t: query.t || "resumen",
        },
    }
}

export default Generate
