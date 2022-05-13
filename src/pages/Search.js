import { useState, useEffect } from "react"
import { Searchbar } from "../components/Searchbar"
import { Post } from "../components/Post"
import axios from "axios"

export const SearchPage = () => {
    const [posts, setPosts] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:4000/topfeed')
        .then(res=>setPosts(res.data))
    },[])
    return(
        <main className="h-[100vh] overflow-y-scroll">
            <header>
                <Searchbar />
            </header>

            <div className="h-max p-1 w-full border-b-[0.1px] border-slate-500">
                <h3 className="text-lg font-semibold">Top Posts</h3>
            </div>

            <section className="z-10">
                {posts.map(post => {
                    return <Post key={post.id} post={post}/>
                })}

            </section>
        
        </main>
    )
}

