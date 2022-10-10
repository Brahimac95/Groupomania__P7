import React from 'react';
import HeaderNav from "../Components/HeaderNav";
import {Navigate} from "react-router-dom";
import PostList from "../Components/PostList";
import "../Styles/Pages/_home.scss";


export default function Home() {

  let userData = JSON.parse(localStorage.getItem("dataUser"));
  return (
    
    //On vérifie avec la fonction ternaire si les données et surtout le Token est encore dans le localStorage
    userData?

    <div>
      <HeaderNav/>
      <div className="container-form">
        <div className="loadingbg">
          <div className="loader"></div>
        </div>
        <h1 style={{textAlign: 'center', marginTop: '20px', fontSize: '22px'}}>Bienvenue{" "}{userData.firstName}</h1>
        <PostList/>
      </div>
    </div>
    : <Navigate to="/login" replace={true}/>
  )
}
