import { useNavigate } from "react-router-dom"
import {TextWithHover} from "../components/TextWithHover"
import { useCookies } from "react-cookie";

export const LoggedInContainer = ({children, currActiveScreen}) => {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const cookiedelete= () =>{
        removeCookie("token");
        navigate("/home");
    };
    return (
        <div className="h-full w-full overflow-auto bg-amber-400">
            <div className="h-1/10 w-full flex justify-between p-10">
                <div className="text-4xl tracking-wide font-barcelony">
                    BlogVista
                </div>
                <div className="flex items-center justify-between space-x-5">
                    <TextWithHover displayText={"Home"} active={currActiveScreen==="home"} onClick={() => navigate("/home")}></TextWithHover>
                    <TextWithHover displayText={"My Blogs"} active={currActiveScreen==="myblogs"} onClick={() => navigate("/myblogs")}></TextWithHover>
                    <TextWithHover displayText={"Gallery"} active={currActiveScreen==="gallery"} onClick={() => navigate("/gallery")}></TextWithHover>
                    <TextWithHover displayText={"Log Out"} active={false} onClick={() => cookiedelete()}></TextWithHover>
                </div>
            </div>
            {children}
        </div>
    )
}