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
import { BsClockHistory } from "react-icons/bs"
import { TbFileExport } from "react-icons/tb"

import Link from "next/link"
import InfoCard from "@/components/InfoCard"
import Footer from "@/components/Footer"
import TopBar from "@/components/TopBar"

const text = `<html>
<head>
<title>La Inteligencia Artificial y el Machine Learning</title>
</head>
<body>
<h1>La Inteligencia Artificial y el Machine Learning</h1>
<p>La inteligencia artificial (IA) y el machine learning (ML) son dos temas cada vez más populares en la tecnología de hoy. Ambos tienen el potencial de cambiar la forma en que vivimos, trabajamos y nos relacionamos con las máquinas. Sin embargo, a menudo se utilizan de forma intercambiable, es importante entender las diferencias entre ellos.</p>
<h2>¿Qué es la inteligencia artificial?</h2>
<p>La inteligencia artificial es un campo de la informática que busca desarrollar sistemas y programas que puedan realizar tareas que normalmente requieren inteligencia humana, como el aprendizaje, el razonamiento y el reconocimiento de patrones. Esto incluye cosas como el reconocimiento de voz, la traducción automática y la conducción autónoma. La IA se divide en dos categorías: la IA débil y la IA fuerte.</p>
<h3>IA débil</h3>
<p>La IA débil, también conocida como IA de tarea específica, se enfoca en desarrollar sistemas que puedan realizar una tarea específica de manera eficiente. Por ejemplo, el reconocimiento de voz en un asistente de voz como Siri o Alexa es un ejemplo de IA débil.</p>
<h3>IA fuerte</h3>
<p>La IA fuerte, también conocida como IA general, busca desarrollar sistemas que puedan realizar cualquier tarea que un ser humano pueda realizar. Esto incluye cosas como el pensamiento abstracto y la toma de decisiones. Aunque todavía está lejos de ser una realidad, la IA fuerte es el objetivo a largo plazo del campo de la IA.</p>
<h2>¿Qué es el machine learning?</h2>
<p>El machine learning es una subárea de la IA que se enfoca en desarrollar sistemas y programas que puedan aprender de forma autónoma. En lugar de programar un sistema para realizar una tarea específica, se le da acceso a datos y se le permite aprender por sí mismo. El machine learning se divide en dos categorías: el aprendizaje supervisado y el aprendizaje no supervisado.</p>
<h3>Aprendizaje supervisado</h3>
<p>El aprendizaje supervisado es el tipo`

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

            <TopBar />
            <div className="flex flex-col items-center gap-8">
                <main className="w-full flex flex-col gap-8">
                    <section className="h-screen  flex flex-col gap-5 justify-center items-center">
                        <div className="flex items-center flex-col gap-1">
                            <div className="w-2/6 flex flex-col items-center">
                                <Image src={logo} alt="logo" className="w-full h-auto " />
                                <h1 className="text-6xl">
                                    <TypedEffect speed={150} texts={["docu.ai"]} cursor={false} />
                                </h1>
                            </div>
                            <p className="w-3/4 text-lg  text-center">
                                Say goodbye to late nights and endless homework!
                            </p>
                        </div>
                        <Button
                            onClick={() => {
                                router.push("/auth/signup")
                            }}
                        >
                            Get started
                        </Button>
                    </section>
                    <motion.section
                        onViewportEnter={() => {
                            setIsEditorOnView(true)
                            console.log("s")
                        }}
                        viewport={{ margin: "0px 0px -40px 0px", once: true }}
                        className="w-full  flex flex-col justify-center items-center pt-8 px-4 gap-12"
                    >
                        <h2 className="text-2xl text-center uppercase font-extrabold">
                            Generate and edit your papers in minutes
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
                                <span className="text-sm text-terciary-blue underline|">Edit the document bellow</span>
                                <article className="bg-white w-full px-4 py-4 rounded-md  border-black border-solid border-2 shadow-xl">
                                    <Editor data={text} />
                                </article>
                            </div>
                        )}
                    </motion.section>
                    <section className="px-4 flex flex-col items-center">
                        <h2 className="font-extrabold uppercase text-xl text-center">
                            Create essays, analysis and research papers in minutes
                        </h2>
                        <div className="mt-4 flex flex-col items-center gap-4">
                            <InfoCard
                                title="The perfect tool for students"
                                text={
                                    "Save time and effort in your schoolwork by generating texts and documents in an instant"
                                }
                                // link={
                                //     <Link
                                //         href={"/pricing"}
                                //         className={
                                //             "flex items-center text-base font-semibold text-black gap-2 underline"
                                //         }
                                //     >
                                //         See detailed prices
                                //         <HiOutlineArrowNarrowRight className="text-4xl text-black relative top-[2px]" />
                                //     </Link>
                                // }
                                icon={<BsClockHistory className="text-5xl opacity-80" />}
                            />
                            <InfoCard
                                text={"Export your documents directly to PDF or DOCX and access them at any time."}
                                title="Export your documents"
                                // link={
                                //     <Link
                                //         href={"/pricing"}
                                //         className={
                                //             "flex items-center text-base font-semibold text-black gap-2 underline"
                                //         }
                                //     >
                                //         See detailed prices
                                //         <HiOutlineArrowNarrowRight className="text-4xl text-black relative top-[2px]" />
                                //     </Link>
                                // }
                                icon={<TbFileExport className="text-5xl opacity-80" />}
                            />
                            <InfoCard
                                text={"On our platform, we offer affordable prices. "}
                                title="Affordable prices for all"
                                link={
                                    <Link
                                        href={"/pricing"}
                                        className={
                                            "flex items-center text-base font-semibold text-black gap-2 underline"
                                        }
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
                <Footer />
            </div>
        </div>
    )
}
