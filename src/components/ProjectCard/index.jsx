import { useRouter } from "next/router"
import React from "react"
import { FiEdit } from "react-icons/fi"
import { motion } from "framer-motion"

const ProjectCard = ({ details, title, type, content, index, documents }) => {
    const router = useRouter()
    return (
        <motion.div
            whileHover={{ x: 1, y: 1 }}
            onClick={() => {
                router.push({
                    pathname: "document/editor",
                    query: {
                        index,
                    },
                })
            }}
            className="hover:cursor-pointer relative flex justify-center flex-col items-start border-black border-solid border rounded-sm gap-2 shadow-md hover:shadow-2xl sm:w-96"
        >
            <div className="flex flex-col w-full  min-h-[160px]">
                <div className="px-2 border-black border-solid border w-full  border-l-0 border-r-0 border-t-0 py-2 flex justify-between items-center h-fit">
                    <span className="text-sm">{title}</span>
                    <span className="font-semibold text-xs">{type}</span>
                </div>
                <div className="grow px-2 py-2 flex-col flex justify-between gap-1 ">
                    <span className="text-xs opacity-80 uppercase ">Details</span>
                    <textarea
                        placeholder="No details..."
                        value={details}
                        readOnly
                        className={
                            "w-full border-none resize-none h-full focus:outline-none opacity-90 grow hover:cursor-pointer"
                        }
                    ></textarea>
                </div>
            </div>
            <span className="absolute right-2 bottom-2">{<FiEdit />}</span>
        </motion.div>
    )
}

export default ProjectCard
