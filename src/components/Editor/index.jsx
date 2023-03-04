import React, { useEffect, useRef, useState } from "react"
import Header from "@editorjs/header"
import EditorJS from "@editorjs/editorjs"
import { makePDF } from "@/utils/makePDF"
import { extractModelsFromText } from "@/utils/textToBlockModel"
import Modal from "./Modal"
import Button from "../Button"
import LoadingCircle from "../Icons/LoadingCircle"
import TypedEffect from "../TypedEffect"
import { getDocuments, updateDocumentBlocks } from "@/firebase/db"

const EDITOR_HOLDER_ID = "editor"

var loadingMessages = [
    "Loading, please stand by...",
    "Preparing information...",
    "Loading content...",
    "Please wait while your request is being processed...",
    "Getting data, please wait...",
    "Initializing, please wait...",
    "Loading resources, please wait...",
    "Processing your request, please wait...",
    "The document is loading...",
    "The document is being generated...",
    "Loading content...",
    "Preparing information...",
    "Collecting data...",
    "Please wait a moment...",
    "Initializing system...",
    "Loading resources...",
    "Please wait while the operation completes...",
    "This process may take a few seconds...",
    "This process may take a few seconds...",
]

const Editor = ({ data, user, index, mode, createDoc }) => {
    const [editorContent, setEditorContent] = useState()
    const editorRef = useRef(null)

    const initEditor = () => {
        editorRef.current = new EditorJS({
            autofocus: true,
            holder: EDITOR_HOLDER_ID,
            tools: {
                header: Header,
            },
            onReady: () => {
                switch (mode) {
                    case "generate":
                        extractModelsFromText(data).then((content) => {
                            console.log(content)
                            editorRef.current.render({
                                blocks: content,
                            })
                            createDoc(content)
                        })
                        break
                    case "edit":
                        editorRef.current.render({
                            blocks: data,
                        })
                        break

                    case "preview":
                        editorRef.current.render({
                            blocks: data,
                        })
                        break

                    default:
                        break
                }
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
            {mode !== "preview" && <hr className="mb-4" />}
            {data ? (
                <ExportButton mode={mode} getDocuments={getDocuments} user={user} setIsOpen={setIsOpen} />
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
                    <div className="absolute right-2 bottom-2 w-10">
                        <LoadingCircle />
                    </div>
                </div>
            )}

            <div id={EDITOR_HOLDER_ID}></div>

            {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} blocks={editorContent} getData={getData} />}
        </>
    )
}

const ExportButton = ({ mode, setIsOpen, user, getDocuments }) => {
    return (
        <div className={"flex w-full justify-end gap-2"}>
            <Button onClick={() => setIsOpen(true)} type="secondary">
                Export
            </Button>

            {mode === "edit" && (
                <Button
                    onClick={async () => {
                        const blocks = await editorRef.current.save()
                        const documents = await getDocuments({ id: user.uid })
                        documents[index].content = blocks
                        updateDocumentBlocks({ id: user.uid, documents })
                    }}
                    type="secondary"
                >
                    save
                </Button>
            )}
        </div>
    )
}

export default Editor
