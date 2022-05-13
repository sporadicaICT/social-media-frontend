import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "../components/Post"
import { Toolbar } from "../components/Toolbar";
export const HomePage = () => {
    const [posts, setPosts] = useState([])
    const { username } = JSON.parse(localStorage.getItem("user"));
    useEffect(() =>{
        fetch(`http://localhost:4000/feed/${username}`)
        .then((response) => response.json())
        .then(data =>{
            console.log(data)
            setPosts(data)
        })
    },[])

    return(
        <div className="h-[100vh] overflow-y-scroll">
            <Toolbar/>
            {posts.map(post =>{
                return <Post key={post.id} post={post}/>
            })}
        </div>
    )
}