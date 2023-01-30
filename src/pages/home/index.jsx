import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { logOut } from "@/firebase/auth"
import { useAuth } from "@/hooks/useAuth"
import Navbar from "../../components/Navbar/index"
import TemplatesCard from "@/components/TemplateCard"
import ProjectCard from "@/components/ProjectCard"
import useUserAuth from "@/hooks/useUserAuth"
import { userExist } from "@/firebase/db"

const Index = () => {
    const { userAuthData, user, status } = useUserAuth()
    const router = useRouter()

    useEffect(() => {
        console.log(user)
        switch (status) {
            case -1:
                router.push("/")
                break
            case 1:
                break
            default:
                break
        }
    }, [status])

    return (
        <>
            <Navbar user={user} />
            <div className="px-4 flex flex-col gap-2">
                <div className="mt-8">
                    <h2 className="uppercase font-extrabold text-xl border-2 border-solid border-black inline-block border-l-0 border-r-0 border-t-0">
                        Get started
                    </h2>
                    <div className="flex flex-col mt-2 gap-2">
                        <TemplatesCard
                            generate={"essay"}
                            title={"Essay"}
                            text={
                                "Provides a basic structure for the essay that includes an introduction, body and conclusion."
                            }
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="uppercase font-extrabold text-xl border-2 border-solid border-black inline-block border-l-0 border-r-0 border-t-0">
                        projects
                    </h2>
                    <div className="flex flex-col mt-2 gap-2">
                        <ProjectCard title={"project title"} text={"project text"} />
                    </div>
                </div>
            </div>
            <button
                onClick={() => {
                    userExist(user.uid).then((res) => console.log(res.data))
                }}
            >
                onclick
            </button>
        </>
    )
}

export default Index
