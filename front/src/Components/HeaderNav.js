import React, { useEffect, useState } from 'react'
import "../Styles/Components/_headerNav.scss";
import Logo from "../assets/icon-white.png"
import { useNavigate } from 'react-router';
import axios from 'axios';


export default function Header() {
    
    const userData = JSON.parse(localStorage.getItem("dataUser"))
    const userId = userData.userId
    // const userId = userData.userId
    // const  [firstName, setFirstName ] = useState("")
    // const  [lastName, setLastName ] = useState("")
    

    const navigate = useNavigate()
    const news = (e) => {
        e.preventDefault()
        navigate("/");
    }
    const logout = (e) => {
        e.preventDefault();
        localStorage.clear('dataUser');
        navigate('/login')
    }

    const myPosts = (e) => {
        e.preventDefault()
        navigate("/mypost")
    }
    const profil = (e) => {
        e.preventDefault();
        navigate('/profil')

    }

    // useEffect(() =>{

    //     axios({
    //       method: "get",
    //       url:"http://localhost:5000/api/auth",
    //       credentials: true,
    //       headers: {
    //         'Authorization': `Bearer ${userData.token}`
    //       },
    //       params: {
    //         userId
            
    //       }
    //     })
    //     .then((res) => {
    //         console.log(res)
    //     //   setFirstName(res.data.firstName)
    //     //   setLastName(res.data.lastName)
    //     //   let welHeader = document.querySelector("h3")
    //     //   welHeader.innerHTML = 
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    
    
    
    //   }, [userData, userId])




  return (
        <header>

            <div className='banner-container'>
                <img src={Logo} alt="Logo Groupomania" className='logo' />
                <h3 >Faites connaissance avec vos collègues</h3>
                <nav className='btn-link'>
                    <ul className='icon-link'>
                        <li className='lien-nav' onClick={logout}>Deconnexion</li>
                        <li className='lien-nav' onClick={news}>Fil d'actualité</li>
                        <li className='lien-nav' onClick={myPosts}>Mes publications</li>
                        <li className='lien-nav' onClick={profil}>Profil</li>
                    </ul>
                </nav>
                
            </div>
        </header>
    )
}

