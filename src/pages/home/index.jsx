import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { logOut } from "@/firebase/auth"
import { useAuth } from "@/hooks/useAuth"
import Navbar from "../../components/Navbar/index"
import TemplatesCard from "@/components/TemplateCard"
import ProjectCard from "@/components/ProjectCard"

const Index = () => {
    const [user, setUser] = useState({
        uid: undefined,
        displayName: undefined,
        email: undefined,
        photoURL: undefined,
        tokens: 0,
    })
    const credentials = useAuth()
    const router = useRouter()

    useEffect(() => {
        switch (credentials.status) {
            case -1:
                router.push("/")
                break
            case 1:
                const { displayName, uid, email, photoURL } = credentials.user
                setUser({
                    ...user,
                    displayName,
                    uid,
                    email,
                    photoURL,
                })
                break
            default:
                break
        }
    }, [credentials.status])

    return (
        <>
            <Navbar credentials={credentials} />
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
        </>
    )
}

export default Index
