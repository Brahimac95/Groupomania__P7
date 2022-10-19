import React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderAuth from '../Components/HeaderAuth';
import '../Styles/Pages/_login.scss';

export default function Login() {


  //Initialisation des Hooks
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [firstName] = useState("")
    const [ error, setError] = useState(false)
    let navigate = useNavigate()



  //Fonction d'enregistrement des données de l'utilisateur y compris le TOKEN dans le LS
  function handleSubmit (e) {
    e.preventDefault();
    if(email === "" || password === ""){
      alert("Veuillez remplir le champ de formulaire vide")
    } else {

      return axios //Axios pour faire notre requête à l'API

      .post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password,
        firstName: firstName,
        
      })
      .then((res) => {
        
        console.log(res.data);
        localStorage.setItem("dataUser", JSON.stringify(res.data));//On serialise les données puis on les met dans le LS
        navigate("/")
          
      })
      .catch((error)=> {
        setError(true)
        console.log(error);
      })
        
    }
     
  }
  function handleClick (e) {
    handleSubmit(e)

  }


  return (
    <>
      <HeaderAuth/>

      <main className='card-form'>
        <form className="login-form">
          <h3>Se connecter</h3>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" 
            onChange={(e) => setEmail(e.target.value)} required value={email}
            placeholder='jean@gmail.com'
          />
          <div className="emailError"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)} required
            value={password}
          />
          <div className="password error"></div>
          <br />
          <span>{error && "Le mail ou le mot de passe incorrecte"}</span>
          <br />
          <button onClick={handleClick} value="Se connecter">Connexion</button>
          <NavLink to="/signup">
            <h4 id='s_inscrire'>S'inscrire</h4>
          </NavLink>
        </form>
      </main>
    </>
  )
}
