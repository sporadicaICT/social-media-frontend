import { useState, useEffect } from "react";
import { IonPopover, IonContent } from "@ionic/react";
import { Avatar } from "../components/Avatar"
import { IoEllipsisVertical, IoAdd, IoCloseSharp } from "react-icons/io5";
import { RiImageAddFill, RiVideoAddFill } from "react-icons/ri";
import axios from "axios";
import { Post } from "../components/Post";

export const ProfilePage = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:4000/user/${user.username}`)
        .then((response) => response.json())
        .then(data=>{
            console.log(data)
        })
    },[])
    useEffect(() =>{
        axios.get(`http://localhost:4000/getposts/${user.username}`)
        .then(data => {
            console.log(data)
            setPosts(data.data)
        })
    }, [])
    return(
        <main className="z-10 h-[100vh] overflow-y-scroll">
            <div className="h-8 flex items-center px-3">

                <span className="ml-auto">
                    <IoEllipsisVertical />
                </span>
            </div>

            <section className="flex px-3 gap-4">
                <Avatar src={user.avatar}/>
                <div>
                    <span>
                        <h2 className="text-lg">{user.username}</h2>
                        <p className="text-sm">{user.name}</p>
                    </span>

                    <span className="flex gap-5">
                        <p className="text-xs">
                            <span className="text-lg">{user.followers}</span> followers
                        </p>
                        <p className="text-xs">
                            <span className="text-lg">{user.following}</span> following
                        </p>
                    </span>
                </div>
            </section>
            <section>
                My Posts
                <ul className="post-list">
                {posts.map(post=>{
                    return <Post key={post.id} post={post} />
                })}
                </ul>
            </section>

            
            <AddPostButton/>
        </main>
    )
}

const AddPostButton = () => {
    var [modalOpen, setModalOpen] = useState(false);
    const [post,setPost] = useState({message:'',image:null});
    var display = modalOpen ? 'block' : 'hidden';

    function handleMessageChange(event){
        setPost({message: event.target.value, image:null})
    }

    function handleModalChange(){
        setModalOpen(true);
    }

    function AddPost() {
        fetch("http://localhost:4000/addpost",{
            "method":"POST",
            "headers":{"Content-Type":"application/json"},
            "body": JSON.stringify({
                message: post.message,
                owner: JSON.parse(localStorage.getItem('user')).username,
                image: post.image
            })
        })
        .then(response => response.json())
        .then(data => setPost())
        .catch(err=>console.error(err))

    }

    return(
        <>                
            <div className={`${display} fixed top-5 z-20 bg-white dark:bg-zinc-900 h-[60vh] w-[80vw]`}>
                <IoCloseSharp onClick={()=>setModalOpen(false)}/>

                <textarea 
                    value={post.message}
                    onChange={handleMessageChange}
                    className="border-0 text-slate-400 w-full h-5/6 dark:text-slate-700"
                    placeholder="What are you thinking?👀"/>

                <span className="h-1/6 flex gap-4">
                    <RiImageAddFill />
                    <RiVideoAddFill/>
                </span>

                <button 
                    onClick={()=>{
                        AddPost()
                        setModalOpen(false)
                    }}
                    className="bg-sky-500 text-white rounded-md border-0">
                    Add Post
                </button>
            </div>

            <button className="fixed right-3 bottom-12 flex items-center justify-center bg-sky-500 text-white border-0 rounded-full w-11 h-11"
                    onClick={handleModalChange}>
                <IoAdd/>
            </button>        
        </>        
    )
}

const Modal = (props) => {
    var display = props.open ? 'block' : 'hidden';
    const [message,setMessage] = useState('');

    function handleMessageChange(event){
        setMessage(event.target.value)
    }
    return(
        <IonContent>
            <div className={`block bg-white dark:bg-zinc-900 h-[60vh] w-[80vw]`}>
                <IoCloseSharp onClick={()=>''}/>

                <textarea 
                    value={message}
                    onChange={handleMessageChange}
                    className="border-0 text-slate-400 w-full h-5/6 dark:text-slate-700"
                    placeholder="What are you thinking?👀"/>

                <span className="h-1/6 flex gap-4">
                    <RiImageAddFill />
                    <RiVideoAddFill/>
                </span>
            </div>
        </IonContent>
    )
}