import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderNav from '../Components/HeaderNav';
import CardPost from '../Components/CardPost';
import '../Styles/Pages/_myPost.scss';
import'../Styles/Pages/_home.scss'

export default function MyPost() {

  const userDataLs = JSON.parse(localStorage.getItem("dataUser"))
  const userId = userDataLs.userId;
  const [posts, setPosts] = useState([])

  useEffect(() => {

    axios.get('http://localhost:5000/api/post', {//On recupère tout les posts en ajoutant le token du l'utilisateur dans le header
      headers: {
        'Authorization': `Bearer ${userDataLs.token}`
      }

    })
    //On recuper tout les posts
    .then((res) => {
      // console.log(res)
      setPosts(res.data)

    })

  }, [userDataLs.token])

  //On cible les posts mais on affiche uniquement les post de l'utilisateur en question
  let userPost = posts.filter(post => {
    return post.userId === userId
  })



  return (
    
    //On regarde si l'utilisateur a publié des posts on les affichent sinon on affiche un message pour proposer au user de poster quelque chose 
    userPost.length > 0 ?
    <div>
      <div className="loadingbg">
        <div className="loader"></div>
      </div>
      <HeaderNav/>
        
        {/* On affiche les publication de la plus ressente a plus ancienne  */}
        <main style={{padding: "50px 0 150px 0"}}>
        {userPost.slice().reverse().map((post) => (<CardPost key={post._id} post={post}/>))} 
        </main>
    </div>
    :
    <>
      <div className="loadingbg">
        <div className="loader"></div>
      </div>
      <HeaderNav/>
      <div className="div">
        <div className="mypost-div">
          <h2 className="mypost-text">Sniff vous n'avez rien poster 😥, Créez une première publication pour vous présenter à vos collègues 🙂</h2>
        </div>
      </div>
    </>
  )
}
