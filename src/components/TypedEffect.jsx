import Typed from "typed.js"
import React, { useEffect, useRef } from "react"

const TypedEffect = ({
    texts,
    speed = 20,
    cursor = true,
    loop = false,
    shuffle = false,
    backSpeed = speed,
    backDelay = 0,
}) => {
    const $span = useRef(null)

    var options = {
        strings: texts,
        typeSpeed: speed,
        backSpeed: speed,
        showCursor: cursor,
        loop,
        shuffle,
        backSpeed,
        backDelay,
    }

    useEffect(() => {
        var typed = new Typed($span.current, options)
    }, [])

    return <span className="" ref={$span}></span>
}

export default TypedEffect
