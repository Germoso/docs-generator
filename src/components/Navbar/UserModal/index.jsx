import React from "react"
import Button from "./Button"
import { BiLogOut } from "react-icons/bi"
import { FiSettings } from "react-icons/fi"
import { logOut } from "@/firebase/auth"
import { motion } from "framer-motion"
import { useRouter } from "next/router"

const UserModal = ({ displayName = "Alexander Germoso" }) => {
    const router = useRouter()
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0.1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0.1 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className="bg-white border-2 border-solid border-black w-fit h-fit absolute right-2 top-16  rounded-md z-[999]"
        >
            <div className="border border-black border-solid border-r-0 border-l-0 border-t-0 px-2 py-1 pr-24">
                <span className="font-bold">{displayName}</span>
            </div>
            <div className="py-2 flex flex-col gap-2">
                <Button text={"Settings"} icon={<FiSettings />} />
                <Button
                    text={"Log out"}
                    icon={<BiLogOut />}
                    onClick={() => {
                        logOut().then(() => router.push("/"))
                        console.log("hola")
                    }}
                />
            </div>
        </motion.div>
    )
}

export default UserModal
