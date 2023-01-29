import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AiOutlineClose } from "react-icons/ai"

const Modal = ({ docx, pdf, isOpen, setIsOpen, blocks, getData }) => {
    const [isDialogHidden, setIsDialogHidden] = useState(false)
    return (
        <div className="h-screen w-full fixed top-0 left-0 z-[999] flex justify-center items-end pb-20 bg-[#0002]">
            <AnimatePresence mode="wait" onExitComplete={() => setIsOpen(false)}>
                {!isDialogHidden && (
                    <motion.div
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        exit={{ y: 200 }}
                        className="bg-white shadow-2xl py-4 w-full mx-10 rounded-lg flex flex-col gap-4 border-2 border-solid border-black"
                    >
                        <div className="relative">
                            <span className="block text-xl text-center relative font-semibold">Download</span>
                            <AiOutlineClose
                                className="absolute right-4 top-0"
                                onClick={() => setIsDialogHidden(true)}
                            />
                        </div>
                        <div className="flex justify-evenly">
                            <button
                                onClick={() => {
                                    getData()
                                }}
                                className=" font-semibold  shadow-terciary-blue bg-transparent border-2 border-black py-2 px-4 rounded-md "
                            >
                                PDF
                            </button>
                            <button className=" font-semibold  shadow-terciary-blue bg-transparent border-2 border-black  py-2 px-4 rounded-md ">
                                DOCX
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Modal
