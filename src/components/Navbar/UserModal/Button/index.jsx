import React from "react"

const Button = ({ text, icon, onClick }) => {
    return (
        <button
            className="hover:cursor-pointer bg-white border-none flex items-center text-base gap-3 px-2 z-[999]"
            onClick={onClick}
        >
            <span className="text-xl relative top-[2px]">{icon}</span>
            {text}
        </button>
    )
}

export default Button
