import React from "react"

const Button = ({ text, icon, onClick }) => {
    return (
        <button className="bg-transparent border-none flex items-center text-base gap-3 px-2" onClick={onClick}>
            <span className="text-xl relative top-[2px]">{icon}</span>
            {text}
        </button>
    )
}

export default Button
