import Image from "next/image"
import React from "react"
import coin from "public/coin.png"

const Index = ({ credentials }) => {
    const user = credentials.user

    return (
        <div className="flex justify-end p-2">
            <div className="flex items-center gap-2">
                <div className="flex gap-4 h-full items-center rounded-md text-sm font-semibold italic">
                    <div className="flex gap-1">
                        <span className="">Letter pieces</span>
                        <span>1456</span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full overflow-clip relative">
                    <Image src={user.photoURL} alt="profile-pic" className="w-full" fill />
                </div>
            </div>
        </div>
    )
}

export default Index
