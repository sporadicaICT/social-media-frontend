import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Avatar } from "../components/Avatar";
import { IoEllipsisVertical, IoAdd, IoCloseSharp, IoChevronBack } from "react-icons/io5";
import { LocationHistory } from "@ionic/react";


export const UserPage = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [following, setFollowing] = useState()
    const { id } = useParams();
    const navigate = useNavigate();

    let yourDetails = JSON.parse(localStorage.getItem('user'))
    useEffect(() =>{
        fetch(`http://localhost:4000/user/${id}`)
        .then((response) => response.json())
        .then((data)=>setUser(data))
        .catch(() => setUser({message: "Error getting user"}))
    },[])

    useEffect(() =>{
        fetch(`http://localhost:4000/getposts/${id}`)
        .then((response) => response.json())
        .then((data)=>setPosts(data))
        .catch(() => setPosts({message: "Error getting user"}))
    },[])

    useEffect(() =>{
        fetch(`http://localhost:4000/checkfollowing/${yourDetails.username}/${user.username}`)
        .then((response) => response.json())
        .then((data)=>{
            data.length === 0 ? setFollowing(false):setFollowing(true)
        })
        .catch(() => setPosts({message: "Error getting user"}))
    },[])

    function AddAsFollower(){
        fetch("http://localhost:4000/addfollowing", {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: yourDetails.username,
                following_id: user.username
            })
        })
        .then(setFollowing(true))
    }
    return(
        <main className="z-10 h-[100vh] bg-white dark:bg-zinc-900 dark:text-white">
            <div className="h-12 flex items-center px-3">

                <span className="flex w-full justify-between">
                    <IoChevronBack onClick={()=>navigate('/main/search')}/>
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
                    <button disabled={user.username === yourDetails.username}
                    onClick={AddAsFollower}  
                        className={`${following?'following btn-follow':'not-following btn-follow'}`}>
                        {following?"Following":"Follow"}
                    </button>
                </div>

            </section>

            <section>
                Posts
                <ul className="post-list">
                    
                {posts.map(post=>{
                    return(
                        <li key={post.id} className="post-item">
                            <h2>{post.owner}</h2>
                            <p>{post.content}</p>
                            <img src={post.image}/>
                        </li>
                    )
                })}
            </ul>
            </section>

    </main>

    )
}