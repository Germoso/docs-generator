import React, { useEffect, useRef, useState } from "react"
import Header from "@editorjs/header"
import EditorJS from "@editorjs/editorjs"
import { makePDF } from "@/utils/makePDF"
import { extractModelsFromText } from "@/utils/textToBlockModel"
import Modal from "./Modal"
import Button from "../Button"
import LoadingCircle from "../Icons/LoadingCircle"
import TypedEffect from "../TypedEffect"

const EDITOR_HOLDER_ID = "editor"
var loadingMessages = [
    "Loading, please stand by...",
    "Preparing information...",
    "Loading content...",
    "Please wait while your request is being processed...",
    "Getting data, please wait...",
    "Loading items, please wait...",
    "Initializing, please wait...",
    "Please wait while the task completes...",
    "Loading resources, please wait...",
    "Processing your request, please wait...",
    "The document is loading...",
    "The document is being generated...",
    "Loading content...",
    "Preparing information...",
    "Collecting data...",
    "Please wait a moment...",
    "Loading interface...",
    "Initializing system...",
    "Loading resources...",
    "Please wait while the operation completes...",
    "This process may take a few seconds...",
]

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
            {data ? (
                <div className="flex justify-end">
                    <Button onClick={() => setIsOpen(true)} type="secondary">
                        Export
                    </Button>
                </div>
            ) : (
                <div className="">
                    <span className="uppercase font-extrabold">
                        <TypedEffect
                            texts={loadingMessages}
                            loop={true}
                            speed={30}
                            shuffle={true}
                            backSpeed={15}
                            backDelay={(Math.floor(Math.random() * (3 - 1 + 1)) + 1) * 5000}
                        />
                    </span>
                    <div className="absolute right-2 bottom-2 w-6">
                        <LoadingCircle />
                    </div>
                </div>
            )}
            {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} blocks={editorContent} getData={getData} />}
        </>
    )
}

export default Editor
