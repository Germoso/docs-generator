import React from "react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { FaDiscord, FaInstagram } from "react-icons/fa"
import logo from "public/logo.png"
import Image from "next/image"

const nav = []

const Index = () => {
    const router = useRouter()

    const icons = {
        initial: { x: 0 },
        animate: { x: 0, transition: { duration: 0.8 } },
    }

    return (
        <motion.footer
            transition={{ duration: 1.4, ease: "easeInOut" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white sm:px-0  w-full text-paragraph text-sm py-4 flex flex-col gap-2"
        >
            <div className="container w-screen mx-auto pl-2 pr-6 sm:px-0">
                <section className="flex flex-col justify-start w-full ">
                    <div className="flex flex-col gap-1 overflow-hidden w-full">
                        <motion.div
                            transition={{ duration: 0.8 }}
                            initial={{ x: "-100%" }}
                            whileInView={{ x: 0 }}
                            viewport={{ once: true }}
                            className="w-16"
                        >
                            {/* <Image src={logo} alt={"logo"} className={"w-full h-auto"} /> */}
                            <span className="font-bold text-base">docu.ai</span>
                        </motion.div>
                        <div className="overflow-hidden">
                            <motion.p
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                initial={{ y: "50%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                className="text-xs"
                            >
                                Made with &lt;3 by the docu.ai team. We use artificial intelligence to help you generate
                                documents faster and more efficiently - thanks for choosing us!
                            </motion.p>
                        </div>
                    </div>
                    <motion.nav
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        initial={{ y: "-100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        className="flex gap-4"
                    >
                        {nav.map((link, index) => (
                            <a key={index} className="text-main" href={link.hash ? `#${link.hash}` : link.url}>
                                {link.title}
                            </a>
                        ))}
                    </motion.nav>
                </section>
                <section className="flex justify-between items-center mt-2">
                    <motion.span
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xs"
                    >
                        ©docu.ai
                    </motion.span>
                    <span className="text-xs">All rights reserved</span>
                </section>
            </div>
        </motion.footer>
    )
}

export default Index
