import React from "react"

const H1 = ({ children, className }) => {
    return <h1 className={`uppercase font-extrabold text-2xl ${className}`}>{children}</h1>
}

export default H1
