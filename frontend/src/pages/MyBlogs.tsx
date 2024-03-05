import TextInput from "../components/TextInput"
import { useEffect, useState } from "react"
import { LoggedInContainer } from "../container/LoggedInContainer"
import axios from "axios";
import { Post } from "../components/Post";
export const MyBlogs = () => {
    const [posts, setPosts] = useState([]);
    const [state, setState] = useState(false);
    const [loading, setLoading] = useState(false)
    const getToken = () => {
        const accessToken = document.cookie.replace(
            /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
        );
        return accessToken;
    };
    useEffect(()=> {
        const fetchData = async () => {
            const backendUrl = "http://localhost:8787/api/v1/blog/posts";
            const token = getToken();
            const response = await axios.get(backendUrl,{
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`,
                }
            });
            if (response && !response.data.err){
                setPosts(response.data);
                setLoading(true);
            }
        }
        fetchData();
    },[state])
    return (
        <div className="h-full w-full">
            {loading ? (
            <LoggedInContainer currActiveScreen={"myblogs"}>
                 <div className="w-full p-10 overflow-auto">
                     <Post posts={posts}/>
                 </div>
            </LoggedInContainer>
            ): (
                <LoggedInContainer currActiveScreen={"myblogs"}>
                    <div className="flex flex-col h-[50%] w-full items-center justify-center text-xl font-mono">
                        Loading....
                    </div>
                </LoggedInContainer>
            )}
        </div>
        
       
    )
}