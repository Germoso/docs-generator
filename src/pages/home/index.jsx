import React, { Suspense, useEffect, useState } from "react"
import { useRouter } from "next/router"
import TemplatesCard from "@/components/TemplateCard"
import ProjectCard from "@/components/ProjectCard"
import useUserAuth from "@/hooks/useUserAuth"
import { getDocuments } from "@/firebase/db"
import Layout from "@/components/Layout"

const Index = () => {
    const [documents, setDocuments] = useState([])
    const { user, status } = useUserAuth()
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

    useEffect(() => {
        if (user.uid) {
            getDocuments({ id: user.uid }).then((documents) => {
                console.log(documents)
                setDocuments(documents)
            })
        }
    }, [user])

    useEffect(() => {
        console.log(documents)

        return () => {}
    }, [documents])

    return (
        <Layout user={user}>
            <div className="px-4 flex flex-col gap-2 container mx-auto">
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
                        Documents
                    </h2>

                    <div className="flex flex-col mt-2 gap-2 sm:flex-row sm:flex-wrap">
                        <ProjectComponents documents={documents} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const ProjectComponents = ({ documents }) => {
    return (
        <>
            {documents.map((document, index) => {
                return (
                    <ProjectCard
                        title={document.prompt}
                        details={document.details}
                        type={document.type}
                        key={document.content}
                        content={document.content}
                        index={index}
                        documents={documents}
                    />
                )
            })}
        </>
    )
}

export default Index
