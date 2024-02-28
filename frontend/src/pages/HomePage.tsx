import TextInput from "../components/TextInput"
import { useState } from "react"
import { LoggedInContainer } from "../container/LoggedInContainer"
import TextInputArea from "../components/TextInputArea"
export const HomePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    return (
        <LoggedInContainer currActiveScreen={"home"}>
            <div className="w-full p-10 ">
                <TextInput label="Title" placeholder="Title...." value={title} setValue={setTitle} className="py-5"></TextInput>
                <TextInputArea label="Content" placeholder="Your thoughts...." value={content} setValue={setContent} className="w-full h-48 text-start resize-none p-2 m-0"></TextInputArea>
            </div>
            <div className="w-full items-center flex justify-center">
                <button className="items-center border-2 rounded-xl bg-orange-400 hover:text-white p-2 text-lg font-mono">Submit Your Story Space</button>
            </div>
        </LoggedInContainer>
    )
}