import React from "react"

const Buttons = ({ getPDF }) => {
    return (
        <div className="flex justify-evenly">
            <button
                onClick={() => {
                    getPDF()
                }}
                className=" font-semibold  shadow-terciary-blue bg-transparent border-2 border-black py-2 px-4 rounded-md "
            >
                PDF
            </button>
            <button className=" font-semibold  shadow-terciary-blue bg-transparent border-2 border-black  py-2 px-4 rounded-md ">
                DOCX
            </button>
        </div>
    )
}

export default Buttons
