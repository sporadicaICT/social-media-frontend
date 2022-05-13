import { IoChatbubbleEllipses } from "react-icons/io5";
import { useNavigate } from "react-router";
export const Toolbar = () => {
    const navigate = useNavigate()

    return(
        <header className="w-full px-3 sticky justify-end flex h-8">
            <IoChatbubbleEllipses 
                onClick={()=>navigate('/chat/users')}
                size={25}/>
        </header>
    )
}