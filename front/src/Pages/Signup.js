import React, { useState } from 'react'
import axios from 'axios'
import HeaderAuth from '../Components/HeaderAuth'
import '../Styles/Pages/_login.scss'
import { useNavigate, NavLink } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()

  const [ firstName, setFirstName] = useState("")
  const [ lastName, setLastName] = useState("")
  const [ email, setEmail] = useState("")
  const [ password, setPassword] = useState("")
  const [ passwordConfirm, setPasswordConfirm] = useState("")

  //Regex pour le controle du password
  let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  let testPassword = strongRegex.test(password);
  let passwordErrorReg = document.querySelector(".passwordError");
  let passwordError = document.querySelector(".password.error");

  //Regex nom et prénom
  let errorName = document.querySelectorAll('.errorName')
  let regexName = new RegExp(/^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/)
  let testName = regexName.test(lastName, firstName)



  
  // const testName = regExpName.test(firstName)

  

  // function handleClick (e){
  //   handleSubmit(e)
   
  // }
  


  function handleSubmit (e) {
    e.preventDefault()
    // passwordError.innerHTML = "";
    // passwordErrorReg.innerHTML = "";
  

    if(!testName){
      errorName.innerHTML= "Le  nom  ou le prénom ne doit pas contenir de chiffre"
    }  
    if(
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm ===""
    ){
      alert('Veuillez compléter le champs de formulaire vide')
      
    }  
     
    else if(!testPassword) {
      passwordErrorReg.innerHTML = "Le mot de passe doit contenir au moins 8 caractères 1 majuscule et 1 chiffre";
    }
     else if(password !== passwordConfirm){
      passwordError.innerHTML = "Les mots de passe ne sont pas identique 🥺"

    } 
    else {

      return axios
      .post("http://localhost:5000/api/auth/signup", {

        lastName: lastName,
        firstName: firstName,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      })
      .then((res) =>{
        // console.log(res.data)
        alert("Votre compte a été créé, veuillez vous connecter 😊")
        navigate("/login") 

      }) 
      .catch(error =>{
        console.log(error)
        const emailError = document.querySelector(".emailError")
          emailError.innerHTML = " Email déjà utilisé "
        // alert("Il s'est produit une erreur lors de votre inscription, veuillez réessayer plus tard ")
       
      }) 
    }
     
  }


  return (
    <div>
        <HeaderAuth/>
      <main className='card-form'>

      <form onSubmit={(e) => handleSubmit(e)} method='post' className="login-form">
      <h3>Inscription</h3>
        <label htmlFor="lastName">Nom</label>
       
        <input 
            type="text"
            id="lastName" 
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
        />
        <span className='errorName'></span>
        <label htmlFor="firstName">Prénom</label>
        <input 
            type="text"
            id="firstName" 
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <span className='errorName'></span>
        <label htmlFor="email">Email</label>
        <input 
          type="text"
          id="email" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='jean@gmail.com'
        />
        <span className="emailError"></span>
        <label htmlFor="password">Mot de passe</label> 
        <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <span className='passwordError'></span>
        <label htmlFor="password">Confirmation de mot de passe</label>
        <input
            type="password"
            id="passwordConfirm"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            />
        <span className="password error"></span>
        <br />
        <NavLink to="/login">
          <button onClick={(e) => handleSubmit(e)} value="Se connecter">Envoyez</button>
        </NavLink>
        <NavLink to="/login">
        <h3 id='s_inscrire'>Retour👈🏽</h3>
        </NavLink>
      </form>
    </main>
  </div>
)
}
