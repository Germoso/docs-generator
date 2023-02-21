import React, { useEffect, useState } from "react"
import Navbar from "../Navbar"
import Footer from "../Footer"
import { motion, useAnimationControls } from "framer-motion"
import { Sling as Hamburger } from "hamburger-react"
import Link from "next/link"

const Layout = ({ user, children }) => {
    const controls = useAnimationControls()
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        if (!isOpen) {
            controls.start({ x: 0, y: 0 })
            console.log(isOpen)
            document.body.style.overflowY = "auto"
        } else {
            document.body.style.overflowY = "hidden"
            controls.start({ x: 300, y: 300 })
        }
    }, [isOpen])

    return (
        <div className="relative min-h-screen flex flex-col justify-between gap-8 bg-black ">
            <div className="fixed top-0 left-0 z-[999] flex items-center">
                <Hamburger toggled={isOpen} toggle={setOpen} size={20} color={isOpen ? "#FFF" : "#000"} />
                <span className={`select-none font-semibold text-xl ${isOpen ? "text-white" : "text-black"}`}>
                    docs.ai
                </span>
            </div>

            <ul className=" bg-black fixed top-0 left-0 w-full h-screen flex flex-col justify-center list-none text-white text-2xl uppercase gap-8 pl-10">
                <Li href={"/"}>Home</Li>
                <Li href="/pricing">Pricing</Li>
                <Li href="auth/signin">Login</Li>
                <Li href="auth/signup">Get Started</Li>
            </ul>

            <motion.div
                className="z-50 h-screen bg-white flex flex-col "
                transition={{ duration: 1 }}
                animate={controls}
                initial={{ x: 0 }}
            >
                <Navbar isOpen={isOpen} setOpen={setOpen} user={user} />
                <div className="grow flex flex-col justify-between bg-white">
                    <div className="px-4  bg-white mb-10">{children}</div>
                    <Footer />
                </div>
            </motion.div>
        </div>
    )
}

const Li = ({ children, href = "" }) => {
    return (
        <li className="hover:cursor-pointer">
            <a className="text-white no-underline hover:underline" href={href}>
                {" "}
                {children}{" "}
            </a>
        </li>
    )
}

export default Layout
