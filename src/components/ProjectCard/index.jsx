import { useRouter } from "next/router"
import React from "react"
import { FiEdit } from "react-icons/fi"

const ProjectCard = ({ details, title, type, content, index, documents }) => {
    const router = useRouter()
    return (
        <div
            onClick={() => {
                router.push({
                    pathname: "document/editor",
                    query: {
                        index,
                    },
                })
            }}
            className="hover:cursor-pointer relative flex justify-center flex-col items-start border-black border-solid border rounded-sm gap-2 shadow-md"
        >
            <div className="flex flex-col w-full  min-h-[160px]">
                <div className="px-2 border-black border-solid border w-full  border-l-0 border-r-0 border-t-0 py-2 flex justify-between items-center h-fit">
                    <span className="text-sm">{title}</span>
                    <span className="font-semibold text-xs">{type}</span>
                </div>
                <div className="grow px-2 py-2 flex-col flex justify-between gap-1">
                    <span className="text-xs opacity-80 uppercase ">Details</span>
                    <textarea
                        placeholder="No details..."
                        value={details}
                        readOnly
                        className={"w-full border-none resize-none h-full focus:outline-none opacity-90 grow"}
                    ></textarea>
                </div>
            </div>
            <span className="absolute right-2 bottom-2">{<FiEdit />}</span>
        </div>
    )
}

export default ProjectCard
