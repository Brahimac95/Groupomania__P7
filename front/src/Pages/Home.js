import React from 'react';
import HeaderNav from "../Components/HeaderNav";
import {Navigate} from "react-router-dom";
import PostList from "../Components/PostList";
import "../Styles/Pages/_home.scss";


export default function Home() {

  let user = JSON.parse(localStorage.getItem("dataUser"));
  return (

    user?

    <div>
      <HeaderNav/>
      <div className="container-form">
        <div className="loadingbg">
          <div className="loader"></div>
        </div>

        <h1 style={{textAlign: 'center', marginTop: '20px', fontSize: '22px'}}>Bienvenue {" "} {user.firstName}</h1>
        {/* <CreatePost/> */}
        <PostList/>

      </div>
    </div>
      : <Navigate to="/login" replace={true}/>
  )
}
