import Button from "@/components/Button"
import InfoCard from "@/components/InfoCard"
import React from "react"
import { BsWallet2 } from "react-icons/bs"
import { BiTime, BiLock } from "react-icons/bi"
import TypedEffect from "@/components/TypedEffect"
import Layout from "@/components/Layout"
import Footer from "../../components/Footer"
import { useRouter } from "next/router"

// 2600 Caracteres 400 palabras

const Pricing = () => {
    const router = useRouter()
    return (
        <Layout>
            <div className="px-4 container mx-auto">
                <section className="h-screen flex flex-col justify-center items-center gap-6">
                    <article>
                        <h1 className="text-4xl text-center uppercase font-extrabold">Pricing</h1>
                        <p>
                            <span className="font-bold italic">
                                <TypedEffect texts={[`"Letter pieces"`]} cursor={false} speed={30} />
                            </span>{" "}
                            Only pay for what you use
                        </p>
                    </article>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                router.push("/auth/signup")
                            }}
                            className={"uppercase text-xs"}
                        >
                            Get Started
                        </Button>
                        <Button type="secondary" className={"uppercase text-xs"}>
                            <a href="#prices" className="no-underline text-black hover:text-white">
                                See prices
                            </a>
                        </Button>
                    </div>
                </section>
                <div>
                    <h2 className="font-extrabold text-center">Optimize your time and money with our prices</h2>
                    <section className="flex flex-col gap-4 mt-14">
                        <InfoCard
                            icon={<BsWallet2 className="text-4xl" />}
                            title="Pay what you use"
                            text="Pay only for what you use, no commitments or fees. Choose the amount of Letter pieces you need and pay only for that."
                        />
                        <InfoCard
                            icon={<BiLock className="text-4xl" />}
                            title="Easy and secure payments"
                            text="Our payment system is easy, secure and flexible. All transactions are made through a secure and encrypted connection."
                        />
                        <InfoCard
                            icon={<BiTime className="text-4xl" />}
                            title="No waiting"
                            text="Our service is immediate, with which you will be able to generate your texts, documents, essays, etc. in just a few minutes and with just a few steps."
                        />
                    </section>
                    <section className="flex flex-col items-center h-[80vh] justify-center gap-4">
                        <h2 className="font-extrabold text-center">Get all the benefits at the right price</h2>
                        <div className="w-full" id="prices">
                            <table className="text-center border-2 border-black border-solid rounded-xl w-full">
                                <thead>
                                    <tr>
                                        <th>Letter Pieces</th>
                                        <th>Price</th>
                                        <th>Letters</th>
                                        <th>Words</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1k</td>
                                        <td>$0.40</td>
                                        <td>2426</td>
                                        <td>212</td>
                                    </tr>
                                    <tr>
                                        <td>2k</td>
                                        <td>$0.80</td>
                                        <td>4865</td>
                                        <td>402</td>
                                    </tr>
                                    <tr>
                                        <td>3k</td>
                                        <td>$1.00</td>
                                        <td>7521</td>
                                        <td>491</td>
                                    </tr>
                                </tbody>
                            </table>
                            <span className="text-[10px] text-center block">
                                The number of words per letter piece is approximate.
                            </span>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    )
}

export default Pricing
