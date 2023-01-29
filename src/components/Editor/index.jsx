import React, { useEffect, useRef, useState } from "react"
import Header from "@editorjs/header"
import EditorJS from "@editorjs/editorjs"
import { makePDF } from "@/utils/makePDF"
import { extractModelsFromText } from "@/utils/textToBlockModel"
import Modal from "./Modal"
import Button from "../Button"

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
                extractModelsFromText(data).then((data) => {
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
            {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} blocks={editorContent} getData={getData} />}
        </>
    )
}

export default Editor
