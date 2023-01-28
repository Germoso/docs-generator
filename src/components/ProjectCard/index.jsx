import React from "react"

const ProjectCard = ({ icon, text, title }) => {
    return (
        <div className="flex justify-center flex-col items-start border-black border-solid border rounded-sm      gap-2">
            <div className="flex flex-col gap-1 w-full ">
                <div className="px-2 border-black border-solid border w-full block border-l-0 border-r-0 border-t-0 pb-2">
                    <h4 className="">{title}</h4>
                </div>
                <div className="px-2 py-2">
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
