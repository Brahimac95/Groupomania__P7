import React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderAuth from '../Components/HeaderAuth';
import '../Styles/Pages/_login.scss';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("")
    const [ error, setError] = useState(false)
    let navigate = useNavigate()


  function handleClick (e) {

    handleSubmit(e)

  }

  function handleSubmit (e) {
    e.preventDefault();
    if(email === "" || password === ""){
      alert("Veuillez remplir le champ de formulaire vide")
    } else {

      return axios

      .post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password,
        firstName: firstName,
        
      })
      .then((res) => {
        
        // console.log(res.data);
        localStorage.setItem("dataUser", JSON.stringify(res.data));
        navigate("/")
          
      })
      .catch((error)=> {
        setError(true)
        console.log(error);
        // setError(true)
      })
        
    }
     
  }



  return (
    <div>
        <HeaderAuth/>
      <main className='card-form'>

      <form className="login-form">
        <h3>Se connecter</h3>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" 
          onChange={(e) => setEmail(e.target.value)} required value={email}
          placeholder='jean@gmail.com'
        />
        <div className="emailError"></div>
        <br />
        <label htmlFor="password">Mot de passe</label>
        
        <input
          type="password"
          name="passwor"
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
        <h3 id='s_inscrire'>S'inscrire</h3>
        </NavLink>
      </form>
    </main>
    </div>
  )
}
