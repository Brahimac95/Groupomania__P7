import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import CardPost from "./CardPost";


export default function PostList() {
    const [posts, setPosts] = useState([]);
    const userDataLs = JSON.parse(localStorage.getItem('dataUser'))
  
    useEffect(() => {
      axios.get('http://localhost:5000/api/post', {
        headers: {
          'Authorization': `Bearear ${userDataLs.token}`
        }
      })
      .then((res) => {
        setPosts(res.data)
  
      })
      .catch((error) => {
        console.error(error);
      })
  
    }, [userDataLs.token])
  
  
  
  
    return (
      <div className='post-list'>
          {/* <h1>PostList</h1> */}
          <CreatePost setPosts={setPosts} posts={posts}/>
          <section>
            {/* On renoie notre tableau de post et on affiche les post de façon antechrologique */}
            {posts.slice().reverse().map((post) => (<CardPost key={post._id} post={post}/>))}
          </section>
        </div>
    )
  }
  