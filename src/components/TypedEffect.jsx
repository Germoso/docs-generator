import Typed from "typed.js"
import React, { useEffect, useRef } from "react"

const TypedEffect = ({ texts, speed = 20, cursor = true }) => {
    const $span = useRef(null)

    var options = {
        strings: texts,
        typeSpeed: speed,
        backSpeed: speed,
        showCursor: cursor,
    }

    useEffect(() => {
        var typed = new Typed($span.current, options)
    }, [])

    return <span className="text-left" ref={$span}></span>
}

export default TypedEffect
