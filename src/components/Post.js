import { IoHeart,
         IoChatbubbleOutline,
         IoRepeatOutline } from "react-icons/io5";
import { Toast } from "../components/Toast"
import { useState } from "react"
export const Post = (props) =>{
    const { post } = props;
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes)
    const [reposts, setReposts] = useState(post.reposts)

    function AddLike(){
        fetch("http://localhost:4000/addlikes", {
            "method": "PATCH",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify({
                id: post.id,
                owner_id: post.owner_id
            })
        })
        .then((response) => {response.json()})
        .then(()=> setLikes(likes++))
        .catch((error) => { 
            <Toast text={error.message} />
        })
    }
    let repost_display = '';
    props.isRepost ? repost_display = 'block' : repost_display = 'hidden'
    
    const image = <img 
        className="rounded-md w-5/6"
        src={post.image}/>
    return(
        <section className="w-full h-max p-2 border-slate-500 border-b-[0.5px]">
            <p className={`${repost_display} text-sky-400 dark:text-gray-600`}>
                {post.reposted_by} reposted this
            </p>
            <span>{post?.owner_id}</span>
            <h5 className="h-max font-light text-lg">
                {post.content}
            </h5>

            <span className={`${post?.image === null? 'none': 'flex'}`}>
                {image}
            </span>

            <div className="h-max w-full justify-evenly flex text-slate-500">
                <span className="flex items-center gap-5">
                    <IoChatbubbleOutline/>
                </span>
                <span className="flex items-center gap-2">
                    <IoRepeatOutline/> {reposts}
                </span>
                <span className="flex items-center gap-2">
                    <IoHeart onClick={AddLike}/> {likes}
                </span>
            </div>
        </section>
    )
}