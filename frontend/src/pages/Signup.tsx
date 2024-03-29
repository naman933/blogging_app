import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
export function Signup () {
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] =useState("");
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    const backendUrl="http://localhost:8787/api/v1/user/signup";

    const signUp = async() => {
        const data = {email, password, name};
        const response = await axios.post(backendUrl, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
              },
        });

        if (response && !response.data.err){
            const token = response.data.jwt;
            const date= new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token , {path : "/" , expires : date});
            navigate("/home");
        }else{
            alert("Failure");
        }
        return ;
    }

    return (
            <div className="flex flex-col w-full h-full justify-center items-center bg-amber-400">
                <div className="flex flex-col items-center justify-center border-2 p-8 rounded-xl bg-white">
                    <div className="text-3xl font-bold font-barcelony">Sign Up</div>
                    <div className="my-2 text-gray-500 font-mono">Enter your information to create an account</div>
                    <TextInput label="Name" placeholder="John Doe" className="my-2" value={name} setValue={setName}/>
                    <TextInput label="Username" placeholder="johndoe@example.com" className="my-2 mb-4" value={email} setValue={setEmail}/>
                    <PasswordInput label="Password" placeholder="" value={password} setValue={setPassword} />
                    <div className="w-full flex items-center justify-end my-4">
                        <button className="w-full font-semibold bg-black p-3 px-10 rounded-lg text-white" onClick={(e)=> {e.preventDefault(); signUp();}}>Sign Up</button>
                    </div>
                    <div className="font-bold mb-4 my4 flex  w-full items-center justify-center">
                        <div className="font-semibold">Already have an account?</div>
                        <Link className="font-semibold mx-2 underline" to="/signin">Login</Link>
                    </div>
                </div>
            </div>
    )
}