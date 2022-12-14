import React from 'react';
import { useEffect, useState} from 'react';
import axios from 'axios';
import "../Styles/Components/_createPost.scss";
import GaleryImg from "../assets/image-gallery1.png"
import Send from "../assets/send.png"

export default function CreatePost(props) {

  const userDataLs = JSON.parse(localStorage.getItem('dataUser'));//On recupère les données de l'utilisateur dans le LS
  const userId = userDataLs.userId;

  //On initialise les States
  const [post, setPost] = useState('');
  const [firstName, setFirstName] = useState();
  const [id, setId] = useState('');
  
  const [postImgInput, setPostImgInput] = useState('');
  const [imgPostFile, setImgPostFile] = useState();
  
  
  // On recupère les data de l'utilisateur 
  useEffect(() => {
    axios({
      method: "get", url: "http://localhost:5000/api/auth", credentials: true,
      headers: {
        'Authorization': `Bearer ${userDataLs.token}`
      },
      params: {
        userId
      }
    })
    .then((res) => {
      // console.log(res);
      // setLastName(res.data.lastName);
      setFirstName(userDataLs.firstName);
      setId(userDataLs._userId);
    })
    .catch((err) => {
      console.log(err);
    });
  
  }, [userDataLs.token, userId]);

  // Création de Post
  const Post = (e) => {
    e.preventDefault();
    // console.log(post);
  
    if (post !== "") {
      //Le package qui contiendra toutes les données qui seront envoyée à notre BDD
      const formData = new FormData();
      formData.append("userId", userId);
      // formData.append("lastName", lastName);
      formData.append("firstName", firstName);
      formData.append("post", post);
      formData.append("file", imgPostFile);
  
      axios.post("http://localhost:5000/api/post", formData, {headers: {'Authorization': `Bearer ${userDataLs.token}`}})
      .then((res) => {
  
        // console.log(res);
        props.setPosts([...props.posts, res.data])
        //Réinitialisation tous nos éléments apres l'envoi
        setPost('')
        setPostImgInput('')
        setImgPostFile('')
        // setFirstName('')          
  
      })
      .catch((err) => {
        console.log(err);
      });
  
    } else {
      alert('Veuillez écrire du contenu dans votre poste');
    }
  
  };
  
  
  //Fonction de traitement de l'image
  const handleImg = (e) => {
    e.preventDefault()
    setPostImgInput(e.target.value)
    setImgPostFile(e.target.files[0])

  };
  
  return (
    <main className='container-reate-post'>
      <div className="create-post">
        <form  onSubmit={(e) => Post(e)} encType='multipart/form-data'>
          <div className="post-redaction">
            <textarea 
              aria-label='Champ pour ajouter le message de votre post' 
              id="textarea-form"
              placeholder={`Quoi de neuf ?`}
              onChange={(e) => setPost(e.target.value)}
              value={post} >
            </textarea>
          </div>
          <div className="post-footer"> 
            <label htmlFor="imagePost">
              <img src={GaleryImg} alt="icon galerie" />
            </label>
            <input type="file" name="imagePost" id="imagePost" 
              accept='.jpg, .jpeg, .png, .gif'
              onChange={handleImg} 
              value={postImgInput}
            />
            <button type='submit' className="create-post-btn" ><img src={Send} alt="" /></button>
          </div>
        </form>
      </div>
    </main>
  )
}