import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import Head from "next/head"
import TypedEffect from "@/components/TypedEffect"
import { useState, useEffect } from "react"
import Button from "@/components/Button"
const Editor = dynamic(() => import("../components/Editor"), { ssr: false })
import { AiOutlineDollarCircle } from "react-icons/ai"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { BsClockHistory } from "react-icons/bs"
import { TbFileExport } from "react-icons/tb"
import Link from "next/link"
import InfoCard from "@/components/InfoCard"
import Footer from "@/components/Footer"
import TopBar from "@/components/TopBar"
import { data } from "../utils/homeEditorData"
import Layout from "@/components/Layout"

export default function Home() {
    const router = useRouter()
    const [isEditorOnView, setIsEditorOnView] = useState(false)

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <Layout>
            <Head>
                <title>Docu.ai</title>
            </Head>

            <header className="h-screen  flex flex-col gap-5 justify-center items-center bg-white">
                <div className="flex items-center flex-col gap-1">
                    <div className="w-2/6 flex flex-col items-center">
                        <h1 className="text-6xl">
                            <TypedEffect speed={150} texts={["docu.ai"]} cursor={false} />
                        </h1>
                    </div>
                    <p className="w-3/4 text-lg  text-center">Say goodbye to late nights and endless homework!</p>
                </div>
                <Button
                    onClick={() => {
                        router.push("/auth/signup")
                    }}
                >
                    Get started
                </Button>
            </header>

            <main className="w-full flex flex-col gap-20 bg-white container mx-auto">
                <motion.section
                    onViewportEnter={() => {
                        setIsEditorOnView(true)
                    }}
                    viewport={{ margin: "0px 0px -40px 0px", once: true }}
                    className="w-full  flex flex-col justify-center items-center pt-8 px-4 gap-12"
                >
                    <h2 className="text-2xl text-center uppercase font-extrabold">
                        Generate and edit your papers in minutes
                    </h2>
                    {isEditorOnView && (
                        <div className="w-full mt-5 flex flex-col justify-center items-center gap-2">
                            <div className="w-full bg-white px-4 py-2 rounded-md font-bold shadow-xl border-black border-solid border-2 md:max-w-3xl">
                                <TypedEffect
                                    texts={[
                                        "Essay on artificiol",
                                        "Essay on artificial intelligence and machinn",
                                        "Essay on artificial intelligence and machine learning",
                                    ]}
                                />
                            </div>
                            <span className="text-sm text-terciary-blue underline|">
                                Edit and export the document bellow
                            </span>
                            <article className="bg-white w-full px-4 py-4 rounded-md  border-black border-solid border-2 shadow-xl md:max-w-3xl">
                                <Editor mode={"preview"} data={data} />
                            </article>
                        </div>
                    )}
                </motion.section>
                <section className="px-4 flex flex-col items-center mt-20">
                    <h2 className="font-extrabold uppercase text-xl text-center">
                        Create essays, analysis and research papers in minutes
                    </h2>
                    <div className="mt-20 flex flex-col justify-center items-center gap-10    w-full md:flex-row md:flex-wrap lg:flex-col">
                        <InfoCard
                            title="The perfect tool for students"
                            text={
                                "Save time and effort in your schoolwork by generating texts and documents in an instant"
                            }
                            icon={<BsClockHistory className="text-4xl opacity-80" />}
                        />
                        <InfoCard
                            text={"Export your documents directly to PDF or DOCX and access them at any time."}
                            title="Export your documents"
                            icon={<TbFileExport className="text-5xl opacity-80" />}
                        />
                        <InfoCard
                            className="shadow-xl"
                            text={"On our platform, we offer affordable prices. "}
                            title="Affordable prices for all"
                            link={
                                <Link
                                    href={"/pricing"}
                                    className={"flex items-center text-base font-semibold text-black gap-2 underline"}
                                >
                                    See detailed prices
                                    <HiOutlineArrowNarrowRight className="text-4xl text-black relative top-[2px]" />
                                </Link>
                            }
                            icon={<AiOutlineDollarCircle className="text-5xl opacity-80" />}
                        />
                    </div>
                </section>
            </main>
        </Layout>
    )
}
