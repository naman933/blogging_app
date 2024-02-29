import TextInput from "../components/TextInput"
import { useEffect, useState } from "react"
import { LoggedInContainer } from "../container/LoggedInContainer"
import axios from "axios";
import { Post } from "../components/Post";
export const MyBlogs = () => {
    const [posts, setPosts] = useState([]);
    const [state, setState] = useState(false);
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
            }
        }
        fetchData();
    },[state])
    return (
        <LoggedInContainer currActiveScreen={"myblogs"}>
            <div className="w-full p-10 overflow-auto">
                <Post posts={posts}/>
            </div>
        </LoggedInContainer>
    )
}