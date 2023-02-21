import { useRouter } from "next/router"
import React from "react"

const TemplatesCard = ({ title, icon, text, generate }) => {
    const router = useRouter()
    return (
        <div
            onClick={() => {
                router.push({
                    pathname: "generate",
                    query: {
                        t: generate,
                    },
                })
            }}
            className="select-none hover:cursor-pointer shadow-lg flex justify-center flex-col items-start border-black border-solid border border-opacity-90 rounded-md py-4 px-8 gap-2"
        >
            {icon}
            <div className="flex flex-col gap-1">
                <h4 className="opacity-90">{title}</h4>
                <p className="opacity-90">{text}</p>
            </div>
        </div>
    )
}

export default TemplatesCard
