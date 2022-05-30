import { IoSearchOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Route, Routes } from "react-router";
import { errorHandled } from "../utils/utils";

export const Searchbar = (props) => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  async function fetchDevUsers() {
    const result = await errorHandled(fetch("http://localhost:4000/users"));
    if (result[1]) throw result[1];
    return result[0].json();
  }
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      fetchDevUsers().then((data) => {
        setUsers(data);
        console.log(data);
      });
    } else {
      fetch(`http://localhost:4000/getusers${"/" + text}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        keepalive: "true",
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          console.log(data);
        })
        .catch((err) => {});
    }
  }, [text]);

  function handleText(event) {
    setText(event.target.value);
    if (event.target.value.length === 0) setUsers([]);
  }

  function moveToUserPage(username) {
    navigate(`/user/${username}`);
  }

  return (
    <>
      <div className="flex items-center w-full h-8 rounded-md">
        <IoSearchOutline />
        <input
          value={text}
          onChange={handleText}
          placeholder="Search"
          className="h-full bg-white dark:bg-zinc-900 px-2 py-4 text-white focus-within:outline-0"
        />
      </div>
      <ul className="absolute w-full z-30 bg-white dark:bg-zinc-900 p-0 m-0 h-max list-none">
        {users.map((user) => {
            return (
                <li
                // User json doesn't have username property, and no users have same id in User.json and Auth.json
              onClick={() => moveToUserPage(user.username)}
              className="w-full h-max p-1 flex gap-4 items-center"
              key={user.id}
            >
              <img className="list-avatar" src={user.avatar} />
              <span>
                <h2 className="h-fit font-semibold">{user.username}</h2>
                <p>{user.name}</p>
                <p>{user.followers} followers</p>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};