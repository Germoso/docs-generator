import React from "react"
import Navbar from "../Navbar"
import Footer from "../Footer"

const Layout = ({ user, children }) => {
    return (
        <div className="min-h-screen flex flex-col justify-between gap-8">
            <div>
                <Navbar user={user} />
                <div className="px-4">{children}</div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout
