import React, { useEffect, useRef, useState } from "react"
import Header from "@editorjs/header"
import EditorJS from "@editorjs/editorjs"
import { makePDF } from "@/utils/makePDF"
import { extractModelsFromText } from "@/utils/textToBlockModel"
import Modal from "./Modal"
import Button from "../Button"

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

const EDITOR_HOLDER_ID = "editor"

const Editor = ({ data }) => {
    const [editorContent, setEditorContent] = useState()
    const editorRef = useRef(null)
    const [blocks, setBlocks] = useState({})

    const initEditor = () => {
        editorRef.current = new EditorJS({
            autofocus: true,
            holder: EDITOR_HOLDER_ID,
            tools: {
                header: Header,
            },
            onReady: () => {
                extractModelsFromText(data || text).then((data) => {
                    console.log(data)
                    setBlocks(data)
                    editorRef.current.render({
                        blocks: data,
                    })
                })
            },
        })
    }

    useEffect(() => {
        if (editorContent) {
            makePDF(editorContent.blocks)
        }
    }, [editorContent])

    const getData = () => {
        editorRef.current.save().then((content) => {
            setEditorContent(content)
        })
    }

    useEffect(() => {
        if (data) {
            initEditor()
        }
    }, [data])

    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div id={EDITOR_HOLDER_ID}></div>
            <div className="flex justify-end">
                <Button onClick={() => setIsOpen(true)} type="secondary">
                    Export
                </Button>
            </div>
            {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} blocks={blocks} />}
        </>
    )
}

export default Editor
