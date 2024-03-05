import TextInput from "../components/TextInput"
import { useEffect, useState } from "react"
import { LoggedInContainer } from "../container/LoggedInContainer"
import TextInputArea from "../components/TextInputArea"
import axios from "axios"
export const HomePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState(false);
    
    const submitContent = () =>{
        const getToken = () => {
            const accessToken = document.cookie.replace(
                /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
                "$1"
            );
            return accessToken;
        };
        const statusChange = async () =>{
            setStatus(false);
        }
        const fetchData = async () => {
            const data = {title, content};
            const backendUrl = "http://localhost:8787/api/v1/blog/";
            const token = getToken();
            console.log(token);
            const response = await axios.post(backendUrl, JSON.stringify(data), {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`,
                }
            });
            if (response && !response.data.err){
                setStatus(true);
                const clockInterval = setInterval(statusChange, 2000);
                setTimeout(() => {
                    clearInterval(clockInterval);
                }, 2000);
            }
            setTitle("");
            setContent("");
        }
        fetchData();
    }
    return (
        <LoggedInContainer currActiveScreen={"home"}>
            <div className="w-full p-10 ">
                <TextInput label="Title" placeholder="Title...." value={title} setValue={setTitle} className="py-5"></TextInput>
                <TextInputArea label="Content" placeholder="Your thoughts...." value={content} setValue={setContent} className="w-full h-48 text-start resize-none p-2 m-0"></TextInputArea>
            </div>
            <div className="w-full items-center flex justify-center">
                <button className="items-center border-2 rounded-xl bg-orange-400 hover:text-white p-2 text-lg font-mono" onClick={(e) => {e.preventDefault(); submitContent();}}>Publish</button>
            </div>
            {status ? (<div className="flex items-center justify-center font-barcelony text-2xl p-5"> Done !!</div>) : (<div></div>)}
        </LoggedInContainer>
    )
}