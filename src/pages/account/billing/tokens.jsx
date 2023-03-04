import React, { useEffect, useState } from "react"
import Layout from "@/components/Layout"
import { addTokensToUser } from "@/firebase/addTokensToUser"
import useUserAuth from "@/hooks/useUserAuth"
import H1 from "@/components/H1"
import dolarToToken from "@/utils/dolarToToken"

import Paypal from "@/components/Paypal"
import H2 from "@/components/H2"

const Tokens = () => {
    const { user, status, setUser } = useUserAuth()
    const [amount, setAmount] = useState("2")
    const [letterPieces, setLetterPieces] = useState(0)
    const [error, setError] = useState({ isError: false, message: "" })

    useEffect(() => {
        console.log(user)
    }, [status])

    useEffect(() => {
        if (amount < 1) return setError({ isError: true, message: "Sorry, deposit amount must be at least $1" })
        if (amount > 10) return setError({ isError: true, message: "Sorry, the maximum deposit amount is $10" })

        setError({ isError: false, message: "" })
        setLetterPieces(Math.round(dolarToToken(Number(amount))))
    }, [amount])

    const handleInputChange = (value) => {
        if (isNaN(Number(value))) return
        setAmount(value)
    }

    return (
        <Layout user={user}>
            <div className="container mx-auto">
                <H1 className={"mt-6"}>Payment</H1>
                <span className="text-sm inline-block">Add letter pieces to your account</span>

                <section className="mt-4 w-full flex-col gap-2 flex bg-gray-100 py-8 px-4">
                    <div className="flex  text-3xl">
                        <span className="opacity-70">$</span>
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => handleInputChange(e.target.value)}
                            placeholder="2"
                            className={`bg-transparent border-none focus:outline-none text-3xl appearance-none m-0`}
                            style={{ width: `${String(amount).length || 1}ch` }}
                        />
                        <span className="opacity-70">USD</span>
                    </div>
                    <hr />
                    <>
                        {!error.isError ? (
                            <div className="text-base italic ">
                                <span className="opacity-70">Letter Pieces:</span>
                                <span className=""> {letterPieces}</span>
                            </div>
                        ) : (
                            <div className="italic text-sm text-red-700">
                                <span>{error.message}</span>
                            </div>
                        )}
                    </>
                </section>
                <H2 className={"mt-8"}>Checkout</H2>
                <section className="bg-gray-100 flex justify-center items-center ">
                    <Paypal amount={amount} disabled={error.isError} />
                </section>
            </div>
        </Layout>
    )
}

export default Tokens
