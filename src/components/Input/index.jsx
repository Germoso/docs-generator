import React from "react"

const Input = ({ placeholder = "", state, setState }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={state}
            className="py-2 px-1"
            onChange={(e) => {
                setState(e.target.vale)
            }}
        />
    )
}

export default Input
