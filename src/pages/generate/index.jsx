import Button from "@/components/Button"
import Input from "@/components/Input"
import React, { useState } from "react"

const Generate = () => {
    const [prompt, setPrompt] = useState("")

    return (
        <div>
            <form className="flex flex-col items-center">
                <Input state={prompt} setState={setPrompt} />
                <Button type="secondary" className={"text-xs"}>
                    Generate
                </Button>
            </form>
        </div>
    )
}

export default Generate
