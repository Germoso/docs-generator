import Image from "next/image"
import React, { useEffect, useState } from "react"
import coin from "public/coin.png"
import UserModal from "./UserModal"
import { AnimatePresence } from "framer-motion"

const Index = ({ user }) => {
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)
    return (
        <div className="sticky left-0 top-0 w-full bg-white z-[999] ">
            <div className="flex justify-end p-2 border-b-2 border-solid border-t-0 border-l-0 border-r-0 border-black">
                <div className="flex items-center gap-2 justify-between w-full">
                    <div>
                        <span className="select-none font-semibold text-2xl px-2 py-2">docs.ai</span>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <div className="flex h-full items-center rounded-md text-sm font-semibold">
                            <div className="flex gap-1 items-center">
                                <span className="">Letter pieces:</span>
                                <span className="font-semibold">{user.tokens}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setIsUserModalOpen(!isUserModalOpen)
                            }}
                            className="w-10 h-10 rounded-full overflow-clip relative"
                        >
                            {user.photoURL && <Image src={user.photoURL} alt="profile-pic" className="w-full" fill />}
                        </button>
                    </div>
                </div>
            </div>
            <AnimatePresence>{isUserModalOpen && <UserModal displayName={user.displayName} />}</AnimatePresence>
        </div>
    )
}

export default Index
