import { useState, useRef, useEffect } from "react"
import { io } from "socket.io-client"
import { IoSend } from "react-icons/io5"
const socket = io('ws://localhost:4000');

export const Chats = () => {
    const [chats, setChats] = useState([])
    const inputRef = useRef()
    
    function sendChat(){
        socket.emit('message', inputRef.current.value)
        inputRef.current.value = ''
    }

    useEffect(() =>{
        socket.on('message', (msg)=>{
            //chats.push(msg)
            setChats([msg])
            console.log(chats)
        })
    }, [])
    return(
        <main className="h-[100vh] dark:bg-zinc-900"> 
            <div className="flex h-[500px] items-end overflow-y-scroll">
                <ul className="h-full w-full"> 
                    {
                        useEffect(() =>{
                            chats.map((chat, index)=>{
                                return <ChatMessage key={index} message={chat}/>
                            })
                        }, [chats.length])
                    }                
                </ul> 
            </div>
            <span className="sticky bottom-0 h-max flex">
                <input placeholder="Message..." ref={inputRef} />
                <button 
                    onClick={sendChat}
                    className="rounded-full w-8 h-8 flex items-center justify-center text-white bg-sky-500"> 
                    <IoSend/>
                </button>
            </span>
        </main>
    )

}


const ChatMessage = ({message}) => {
    let posCol = ''
    if(message.sender_id === socket.id && message.sender_id === undefined) {
        message.sender = username
    }
    message.sender_id === socket.id ? posCol = 'right-0 bg-sky-500' : posCol = 'left-0 bg-slate-500'
    const { username } = JSON.parse(localStorage.getItem('user'))
    return(
        <li className={`${posCol} my-5 text-slate-900 dark:text-white h-max w-1/2 absolute rounded-md`}> 
            <h1>{message.sender}</h1>
            {message.message}
        </li>
    )
}