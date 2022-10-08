import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '../Components/HeaderNav';
import '../Styles/Pages/_updatePost.scss'





export default function UpdatePost() {
  const userDataLs =  JSON.parse(localStorage.getItem('dataUser'))
  const userId = userDataLs.userId;
  const url = window.location.pathname;
  const postId = url.split('/')[2]
  const navigate = useNavigate();
  const [editPost , setEditPost] = useState('');
  const [postImgInput , setPostImgInput] = useState('');
  const [imgPostFile, setImgPostFile] = useState('');
  const [postData, setPostData] = useState('');
  const [dataUser, setDataUser] = useState('');
  const [isAdmin, setIsAdmin] = useState('');


  useEffect(() =>{
    
    axios({
      method: "get",
      url:"http://localhost:5000/api/auth",
      credentials: true,
      headers: {
        'Authorization': `Bearer ${userDataLs.token}`
      },
      params: {
        userId
        
      }
    })
    .then((res) => {
        // console.log(res)
        setDataUser(res.data)
        setIsAdmin(res.data.isAdmin)
     
    })
    .catch((err) => {
      console.log(err);
    })

  }, [userDataLs.token, userId]);

  //On cible que le post grâce à son identifiant
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:5000/api/post/${postId}`,
      credentials: true,
      headers: {
        'Authorization': `Bearer ${userDataLs.token}`

      }

    })
    .then((res) => {
      // console.log(res);
      setPostData(res.data); //On recupère les données du post

    })
    .catch((error) => {
      console.log(error = "Error de récupération des infos du post")
    })

  }, [postId, userDataLs.token])

  
  //Fonction de modification du post
  const updaptePost = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('post' , editPost);
    formData.append('file', imgPostFile);
    formData.append('isAdmin', dataUser.isAdmin);
    
    //On envoies les données en formData en Back
    axios.put(`http://localhost:5000/api/post/${postData._id}`, formData, 

    {headers: {'Authorization': `Bearer ${userDataLs.token}`},
    data: {
      isAdmin //On met le isAdmin dans le header pour que le compte administateur ai les mêmes posibilités que le créateur du post
    }
  
    })

    .then(res => {
      // console.log(res)
      if(editPost === "") {
        alert("Votre ancien message ne sera pas pris en compte, reédité le 😉")

      } else {

        navigate('/')
      }

    })
    .catch((err) => {
      console.log(err);
  });
    

  }

  //Fonction de lecture des input file
  function handleImg (e) {
    e.preventDefault()
    setPostImgInput(e.target.value)
    setImgPostFile(e.target.files[0])
  }


  //Fonction de suppression de post
  const deletePost = (e) => {
    e.preventDefault()

    axios.delete(`http://localhost:5000/api/post/${postData._id}`, {
      headers: {
        'Authorization' : `Bearer ${userDataLs.token}`
      },
      data: {
        isAdmin
      }

    })
    .then(() => {

      alert('Vous avez supprimer votre post ')
      navigate('/')
      
      
    })
    .catch(error => {
      console.error(error = "Erreur de suppression de post")
    })
    


  }






  return (


    <div>
      <HeaderNav/>
        <h2>Modifiez votre post :</h2>
      <main className="update-container" >
                <div className="update-post" aria-label="Créer un post">
                    <img src={postData.imageUrl} alt="" className='img-modify'/>
                    <form onSubmit={(e) => updaptePost(e)} encType="multipart/form-data">
                      <div className="create-post-redaction container-textarea">
                        <textarea maxLength="500" className="update-textarea" 
                          id="message-update"
                          name="message"
                          onChange={(e) => setEditPost(e.target.value)}
                          defaultValue={postData.post}
                        />
                      </div>
                      <label className="modify-post-input-label" htmlFor="imagePost">Changer d'image :</label>
                        <input type="file" name="imagePost" id="imagePost"
                          accept=".png, .jpeg, .jpg, .gif" onChange={handleImg}
                          value={postImgInput} className="create-post-input-file"
                        />
                        <div className="modify-post-footer">
                            <button className="create-post-btn" type="submit">
                              Publiez
                            </button>
                            <button onClick={deletePost} className="create-post-btn">
                              Supprimez 🗑
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
  )
}
