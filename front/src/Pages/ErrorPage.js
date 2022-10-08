import React from 'react';
import {useNavigate} from "react-router";
import "../Styles/Pages/_error404.scss";

export default function ErrorPage() {

    const navigate = useNavigate();

    function returnHome(){
    
        navigate('/')
    
    }


  return (
    <div>
        <div id='oopss'>
        <div id='error-text'>
            <span>404</span>
            <p id='oups'>Oups cette page n'existe pas pas 🙈</p>
            <p onClick={returnHome} className='hmpg back'>Retournez à la page d'accueil 🏡</p>
        </div>
    </div>

    </div>
  )
}
