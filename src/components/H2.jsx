import React from "react"

const H2 = ({ children, className }) => {
    return <h2 className={`font-extrabold uppercase text-lg ${className}`}>{children}</h2>
}

export default H2
