import Image from "next/image"
import React, { useState } from "react"
import UserModal from "./UserModal"
import { AnimatePresence } from "framer-motion"
import Button from "../Button"
import { useRouter } from "next/router"

const Index = ({ user, isOpen, setOpen }) => {
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)

    const router = useRouter()

    return (
        <div className="sticky left-0 top-0 w-full z-50 bg-white">
            <div className="flex justify-end py-2 pr-2">
                <div className="relative flex items-end gap-2 justify-end w-full">
                    {user ? (
                        <div className="flex justify-center items-center gap-2">
                            <div className="flex gap-1 items-center text-xs font-semibold">
                                <span className="">Letter pieces:</span>
                                <span className="font-semibold">{user.tokens}</span>
                            </div>
                            <button
                                onClick={() => {
                                    setIsUserModalOpen(!isUserModalOpen)
                                }}
                                className="w-8 h-8 rounded-full overflow-clip relative"
                            >
                                {user.photoURL && (
                                    <Image
                                        src={user.photoURL}
                                        alt="profile-pic"
                                        className="hover:cursor-pointer w-full"
                                        fill
                                    />
                                )}
                            </button>
                        </div>
                    ) : (
                        <Button
                            type="tertiary"
                            className={"hover:underline text-base"}
                            onClick={() => router.push("/auth/signin")}
                        >
                            Sign In
                        </Button>
                    )}
                </div>
            </div>
            <div
                className="relative z-50
            "
            >
                <AnimatePresence>
                    {isUserModalOpen && <UserModal displayName={user.displayName} />}
                    {/* {isOpen && <Panel />} */}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Index
