import TextInput from "../components/TextInput"
import { useState } from "react"
import { LoggedInContainer } from "../container/LoggedInContainer"
export const Gallery = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    return (
        <LoggedInContainer currActiveScreen={"gallery"}>
            <div className="w-full p-10">
                <TextInput label="Title" placeholder="Title...." value={title} setValue={setTitle} className="w-1/2 h-full py-5"></TextInput>
                <TextInput label="Content" placeholder="Your thoughts...." value={content} setValue={setContent} className="w-1/2 h-full"></TextInput>
            </div>
        </LoggedInContainer>
    )
}