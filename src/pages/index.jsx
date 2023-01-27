import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import Image from "next/image"
import { motion } from "framer-motion"
import Head from "next/head"
import TypedEffect from "@/components/TypedEffect"
import logo from "public/logo.png"
import { useState } from "react"
import Button from "@/components/Button"
const Editor = dynamic(() => import("../components/Editor"), { ssr: false })
import { AiOutlineDollarCircle } from "react-icons/ai"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

import Link from "next/link"
import InfoCard from "@/components/InfoCard"

export default function Home() {
    // function onSubmit(event) {
    //     event.preventDefault()
    //     router.push({
    //         pathname: "/editor",
    //         query: { prompt: animalInput },
    //     })
    // }

    const router = useRouter()
    const login = () => {
        router.push("/auth/signin")
    }

    const [isEditorOnView, setIsEditorOnView] = useState(false)
    return (
        <div>
            <Head>
                <title>Docu.ai</title>
            </Head>

            <header className="fixed w-full z-[999] flex justify-between">
                <span className="block font-semibold text-2xl px-2 py-2">docu.ai</span>
                <Button type="tertiary" className={"hover:underline"} onClick={() => router.push("/auth/signin")}>
                    Sign In
                </Button>
            </header>
            <main className="w-full flex flex-col gap-8">
                <section className="h-screen  flex flex-col gap-5 justify-center items-center">
                    <div className="flex items-center flex-col gap-1">
                        <div className="w-2/6">
                            <Image src={logo} alt="logo" className="w-full h-auto " />
                            <h1 className="text-center text-4xl">
                                <TypedEffect speed={150} texts={["docu.ai"]} cursor={false} />
                            </h1>
                        </div>
                        <p className="w-3/4 text-sm  text-center">Say goodbye to late nights and endless homework!</p>
                    </div>
                    <Button>Get started</Button>
                </section>
                <motion.section
                    onViewportEnter={() => {
                        setIsEditorOnView(true)
                        console.log("s")
                    }}
                    viewport={{ margin: "0px 0px -40px 0px", once: true }}
                    className="w-full  flex flex-col justify-center items-center pt-8 px-4 gap-16"
                >
                    <h2 className="text-xl text-center uppercase font-extrabold">
                        With our live editor you can create and edit your student papers in minutes
                    </h2>
                    {isEditorOnView && (
                        <div className="w-full flex flex-col justify-center items-center gap-2">
                            <div className="w-full bg-white px-4 py-2 rounded-md font-bold shadow-xl border-black border-solid border-2">
                                <TypedEffect
                                    texts={[
                                        "Essay on artificiol",
                                        "Essay on artificial intelligence and machinn",
                                        "Essay on artificial intelligence and machine learning",
                                    ]}
                                />
                            </div>
                            <span className="text-sm text-terciary-blue underline|">Start using our live editor</span>
                            <article className="bg-white w-full px-4 py-4 rounded-md  border-black border-solid border-2">
                                <Editor />
                            </article>
                        </div>
                    )}
                </motion.section>
                <section className="px-4">
                    <InfoCard
                        text={"On our platform, we offer affordable prices for all students. "}
                        title="Affordable prices for all"
                        link={
                            <Link
                                href={"/pricing"}
                                className={
                                    "flex items-center text-base font-semibold no-underline text-black gap-2 hover:underline"
                                }
                            >
                                See detailed prices
                                <HiOutlineArrowNarrowRight className="text-4xl text-black relative top-[2px]" />
                            </Link>
                        }
                        icon={<AiOutlineDollarCircle className="text-5xl" />}
                    />
                </section>
            </main>
        </div>
    )
}
