import React, { useEffect, useState } from "react"
import Navbar from "../Navbar"
import Footer from "../Footer"
import { motion, useAnimationControls } from "framer-motion"
import { Sling as Hamburger } from "hamburger-react"
import Link from "next/link"
import { logOut } from "@/firebase/auth"
import { useRouter } from "next/router"

const Layout = ({ user, children }) => {
    const controls = useAnimationControls()
    const [isOpen, setOpen] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if (!isOpen) {
            controls.start({ x: 0, y: 0 }).then(() => {
                document.body.style.overflowY = "auto"
            })
        } else {
            document.body.style.overflowY = "hidden"
            controls.start({ x: 300, y: 300 })
        }
    }, [isOpen])

    return (
        <div className="relative min-h-screen flex flex-col justify-between gap-8 bg-black ">
            <div className="fixed top-0 left-0 z-[999] flex items-center">
                <Hamburger toggled={isOpen} toggle={setOpen} size={20} color={isOpen ? "#FFF" : "#000"} />
                <span
                    className={`select-none font-semibold text-xl hover:cursor-pointer ${
                        isOpen ? "text-white" : "text-black"
                    }`}
                    onClick={() => window.location.replace("/")}
                >
                    docs.ai
                </span>
            </div>

            <div className="bg-black fixed top-0 left-0 w-full h-screen flex flex-col justify-center pl-8 gap-4">
                <ul className="w-full   flex flex-col justify-center list-none text-white text-2xl uppercase gap-8 ">
                    <Li href={"/"}>Home</Li>
                    <Li href="/pricing">Pricing</Li>
                    <Li href="auth/signin">Login</Li>
                    <Li href="auth/signup">Get Started</Li>
                </ul>
                {user && (
                    <>
                        <hr className="w-40" />
                        <div className="pl-4">
                            <ul className="mt-2 flex flex-col gap-1">
                                <UserLi href="/home">App</UserLi>
                                <UserLi href="/account/billing">Billing</UserLi>
                                <UserLi
                                    onClick={(e) => {
                                        e.preventDefault()
                                        logOut().then(() => router.push("/"))
                                    }}
                                >
                                    Log out
                                </UserLi>
                            </ul>
                        </div>
                    </>
                )}
            </div>

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

const UserLi = ({ children, href = "", onClick = () => {} }) => {
    return (
        <li className="hover:cursor-pointer">
            <a className="text-white no-underline hover:underline" href={href} onClick={(e) => onClick(e)}>
                {" "}
                {children}{" "}
            </a>
        </li>
    )
}

export default Layout
