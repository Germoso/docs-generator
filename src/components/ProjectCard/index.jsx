import React from "react"
import { FiEdit } from "react-icons/fi"

const ProjectCard = ({ text, title, type }) => {
    return (
        <div className=" relative flex justify-center flex-col items-start border-black border-solid border rounded-sm gap-2 shadow-md">
            <div className="flex flex-col w-full ">
                <div className="px-2 border-black border-solid border w-full  border-l-0 border-r-0 border-t-0 py-2 flex justify-between items-center">
                    <span className="text-sm">{title}</span>
                    <span className="font-semibold text-xs">{type}</span>
                </div>
                <div className="px-2 py-2 flex-col flex justify-between gap-1">
                    <span className="text-xs opacity-80 uppercase ">Details</span>
                    <textarea
                        placeholder="No details..."
                        value={text}
                        readOnly
                        className={"w-full border-none resize-none focus:outline-none opacity-90"}
                    ></textarea>
                </div>
            </div>
            <span className="absolute right-2 bottom-2">{<FiEdit />}</span>
        </div>
    )
}

export default ProjectCard
