import { useRouter } from "next/router"
import React from "react"
import { BiDollarCircle } from "react-icons/bi"

const BillingCards = ({ title, description, icon, link }) => {
    const router = useRouter()
    return (
        <article
            className={`w-fit flex justify-center items-center gap-2  text-center opacity-80 hover:opacity-100 hover:cursor-pointer select-none`}
            onClick={() => {
                router.push(link)
            }}
        >
            <div className="border-black border-solid border rounded-xl py-2 px-2 border-opacity-80 ">{icon}</div>
            <div className="text-start">
                <h1 className="text-lg">{title}</h1>
                <div>
                    <p className="text-left opacity-80 text-sm">{description}</p>
                </div>
            </div>
        </article>
    )
}

export default BillingCards
