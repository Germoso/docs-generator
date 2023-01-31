import React from "react"

const InfoCard = ({ icon = null, title, text, link = null, className }) => {
    return (
        <article
            className={`flex justify-center flex-col items-start border-black border-solid border rounded-xl py-4 px-8 gap-2 border-opacity-80 ${className}`}
        >
            {icon}
            <div className="flex flex-col gap-1 opacity-80">
                <h4>{title}</h4>
                <p>{text}</p>
            </div>
            {link}
        </article>
    )
}

export default InfoCard
