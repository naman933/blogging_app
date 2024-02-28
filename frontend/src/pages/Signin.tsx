import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
export function Signin() {
    const [email, setEmail] =useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    const backendUrl="http://localhost:8787/api/v1/user/signin";

    const signIn = async() =>{
        const data = {email, password};
        const response = await axios.post(backendUrl, JSON.stringify(data), {
            headers : {
                "Content-Type" : "application/json",
            }
        });

        if (response && !response.data.err){
            const token = response.data.jwt;
            const date= new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token , {path : "/api/v1/user/signin" , expires : date});
            navigate("/home");
        }else{
            alert("Wrong credentials!!!");
        }
        return;
    }

    return(
            <div className="flex flex-col w-full h-full justify-center items-center ">
                <div className="flex flex-col items-center justify-center border-2 p-8 rounded-xl">
                    <div className="text-3xl font-bold">Sign In</div>
                    <div className="my-2 text-gray-500">Enter your credentials to access your account</div>
                    <TextInput label="Username" placeholder="johndoe@example.com" className="my-2 mb-4" value={email} setValue={setEmail}/>
                    <PasswordInput label="Password" placeholder="" value={password} setValue={setPassword} />
                    <div className="w-full flex items-center justify-end my-4">
                        <button className="w-full font-semibold bg-black p-3 px-10 rounded-lg text-white" onClick={(e)=> {e.preventDefault(); signIn();}}>Sign In</button>
                    </div>
                    <div className="font-bold mb-4 my4 flex  w-full items-center justify-center">
                        <div className="font-semibold">Don't have an account?</div>
                        <Link className="font-semibold mx-2 underline" to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
    )
}