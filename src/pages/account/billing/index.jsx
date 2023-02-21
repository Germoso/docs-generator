import BillingCards from "@/components/BillingCards"
import Layout from "@/components/Layout"
import useUserAuth from "@/hooks/useUserAuth"
import React from "react"
import { BiDollarCircle } from "react-icons/bi"
import { IoPricetagsOutline } from "react-icons/io5"

const Billing = () => {
    const { user } = useUserAuth()
    return (
        <Layout user={user}>
            <div className="flex flex-col gap-2">
                <section className="mt-4">
                    <h1 className="uppercase font-extrabold text-">Billing</h1>
                    <p className="mt-2">
                        Here you can manage your <span className="font-bold">"Letter Pieces"</span> balances, our
                        in-application currency that allows you to generate documents automatically with the help of
                        artificial intelligence, making sure you always have access to all the application's functions.
                    </p>
                </section>
                <div className="mt-10">
                    <h2>Manage Your Document Generation Costs</h2>
                    <section className="mt-4 flex flex-col gap-2">
                        <BillingCards
                            title={"Letter Pieces"}
                            description={"Get balance in your account"}
                            icon={<BiDollarCircle className="text-5xl relative top-[3px]" />}
                            link={"/account/billing/tokens"}
                        />
                        <BillingCards
                            title={"Pricing"}
                            description={"Discover detailed pricing"}
                            icon={<IoPricetagsOutline className="text-5xl relative top-[3px]" />}
                            link={"/pricing"}
                        />
                    </section>
                </div>
            </div>
        </Layout>
    )
}

export default Billing
