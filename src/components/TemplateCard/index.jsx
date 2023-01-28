import React from "react"

const TemplatesCard = ({ title, icon, text }) => {
    return (
        <div className="flex justify-center flex-col items-start border-black border-solid border border-opacity-50 rounded-md py-4 px-8 gap-2">
            {icon}
            <div className="flex flex-col gap-1">
                <h4 className="opacity-75">{title}</h4>
                <p className="opacity-75">{text}</p>
            </div>
        </div>
    )
}

export default TemplatesCard
