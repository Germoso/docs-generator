import { use, useEffect, useState } from "react"
import dynamic from "next/dynamic"
const TextEditor = dynamic(() => import("../../components/Editor"), { ssr: false })
import Navbar from "../../components/Navbar"
import useUserAuth from "@/hooks/useUserAuth"
import {
    bodyStructure,
    requestStructure,
    introductionStructure,
    conclusionStructure,
} from "@/utils/TypeOfDocuments/essay"
import Layout from "@/components/Layout"

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

const api_url = process.env.API_URL

export default function Editor({ prompt }) {
    const { user } = useUserAuth()
    const [data, setData] = useState()
    let rowData = ""

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        console.log(Boolean(prompt))
        if (prompt) {
            fetch(api_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: introductionStructure(prompt) }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    fetch(api_url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ prompt: requestStructure(data.result) }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            rowData = rowData.concat("\n", data.result)
                            fetch(api_url, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ prompt: bodyStructure(prompt) }),
                            })
                                .then((res) => res.json())
                                .then((data) => {
                                    console.log(data)

                                    fetch(api_url, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({ prompt: requestStructure(data.result) }),
                                    })
                                        .then((res) => res.json())
                                        .then((data) => {
                                            rowData = rowData.concat("\n", data.result)

                                            fetch(api_url, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({ prompt: conclusionStructure(prompt) }),
                                            })
                                                .then((res) => res.json())
                                                .then((data) => {
                                                    fetch(api_url, {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify({ prompt: requestStructure(data.result) }),
                                                    })
                                                        .then((res) => res.json())
                                                        .then((data) => {
                                                            console.log(data)

                                                            rowData = rowData.concat("\n", data.result)
                                                            setData(rowData)
                                                            console.log("LISTO")
                                                        })
                                                        .catch((error) => console.log(error))
                                                })
                                                .catch((error) => console.log(error))
                                        })
                                        .catch((error) => console.log(error))
                                })
                                .catch((error) => console.log(error))
                        })
                        .catch((error) => console.log(error))
                })
                .catch((error) => console.log(error))
        }
    }, [])

    return (
        <>
            <Layout user={user} />
            <div className="px-4 mt-4">
                <TextEditor data={prompt ? data : text} />
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { prompt } = context.query

    return {
        props: {
            prompt: prompt ? prompt : false,
        },
    }
}
