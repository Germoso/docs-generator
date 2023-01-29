import React from "react"

const InfoCard = ({ icon = null, title, text, link = null }) => {
    return (
        <article className="flex justify-center flex-col items-start border-black border-solid border-2 rounded-xl py-4 px-8 gap-2 border-opacity-80">
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
