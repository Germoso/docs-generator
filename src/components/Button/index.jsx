import React from "react"

const Button = ({ type = "primary", className, children, onClick = () => {} }) => {
    switch (type) {
        case "primary":
            return (
                <button
                    onClick={onClick}
                    className={`gap-2 -2 transition-all  px-4 py-2 rounded-md  bg-black text-white ${className}`}
                >
                    {children}
                </button>
            )

        case "secondary":
            return (
                <button
                    onClick={onClick}
                    className={`bg-white gap-2 -2 px-4 py-2 rounded-md text-base hover:bg-black hover:text-white transition-colors ${className}`}
                >
                    {children}
                </button>
            )
        case "tertiary":
            return (
                <button
                    onClick={onClick}
                    className={`bg-transparent gap-2 -2 px-4 py-2 text-base border-none hover:border-b-2 border-black ${className} `}
                >
                    {children}
                </button>
            )

        default:
            return (
                <button onClick={onClick} className={` ${className}`}>
                    {children}
                </button>
            )
            break
    }
}

export default Button
