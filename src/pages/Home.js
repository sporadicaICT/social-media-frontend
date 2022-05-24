import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "../components/Post"
import { Toolbar } from "../components/Toolbar";
import { errorHandled } from "../utils/utils";
export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const { username } = JSON.parse(localStorage.getItem("user"));
  // Find all posts for a specific person.
  async function fetchDevFeed() {
    const result = await errorHandled(fetch(`http://localhost:4000/feed`));
    if (result[1]) throw result[1];
    return result[0].json();
  }
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      fetchDevFeed().then((data) => {
        console.log(data);
        setPosts(data);
      });
    } else {
      fetch(`http://localhost:4000/feed/${username}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPosts(data);
        });
    }
  }, []);

  return (
    <div className="h-[100vh] overflow-y-scroll">
      <Toolbar />
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
}