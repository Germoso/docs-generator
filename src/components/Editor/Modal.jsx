import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AiOutlineClose } from "react-icons/ai"
import { makePDF } from "@/utils/makePDF"

const Modal = ({ docx, pdf, isOpen, setIsOpen, blocks }) => {
    const [isDialogHidden, setIsDialogHidden] = useState(false)
    return (
        <div
            style={{
                backdropFilter: "blur(1px)",
                background: "linear-gradient(0deg,  #0002, #0002, #fff2, #0002)",
            }}
            className="h-screen w-full fixed top-0 left-0 z-[999] flex justify-center items-end pb-20"
        >
            <AnimatePresence mode="wait" onExitComplete={() => setIsOpen(false)}>
                {!isDialogHidden && (
                    <motion.div
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        exit={{ y: 200 }}
                        className="bg-white shadow-2xl py-4 w-full mx-10 rounded-lg flex flex-col gap-4"
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
                                    makePDF(blocks)
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
