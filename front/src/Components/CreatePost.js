import React from 'react';
import { useEffect, useState} from 'react';
import axios from 'axios';
import "../Styles/Components/_createPost.scss";

export default function CreatePost(props) {

    const userData = JSON.parse(localStorage.getItem('dataUser'));
      const userId = userData.userId;
      const [post, setPost] = useState('');
      // const [lastName, setLastName] = useState('');
      const [firstName, setFirstName] = useState();
      const [id, setId] = useState('');
  
      const [postImgInput, setPostImgInput] = useState('');
      const [imgPostFile, setImgPostFile] = useState();
  
  
  
  
      // Call API for user information
      useEffect(() => {
  
  
          axios({
              method: "get", url: "http://localhost:5000/api/auth", credentials: true,
  
              headers: {
                'Authorization': `Bearer ${userData.token}`
              },
  
              params: {
                  userId
              }
          })
              .then((res) => {
  
                // setLastName(res.data.lastName);
                setFirstName(userData.firstName);
                setId(userData._userId);
  
  
              })
              .catch((err) => {
                console.log(err);
              });
  
      }, [userData, userId]);
  
  
      // Call API for create post
      const Post = (e) => {
          e.preventDefault();
          console.log(post);
  
  
          if (post !== "") {
  
  
            const formData = new FormData();
  
  
            formData.append("userId", userId);
            // formData.append("lastName", lastName);
            formData.append("firstName", firstName);
            formData.append("post", post);
            formData.append("file", imgPostFile);
  
  
  
            axios.post("http://localhost:5000/api/post", formData, {headers: {'Authorization': `Bearer ${userData.token}`}})
                .then((res) => {
  
                  console.log(res);
                  props.setPosts([...props.posts, res.data])
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
  
  
  
      const handleImg = (e) => {
          e.preventDefault()
          setPostImgInput(e.target.value)
          setImgPostFile(e.target.files[0])
          
          
  
      };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    return (
      <main className='container-reate-post'>
          <div className="create-post">
            <form  onSubmit={(e) => Post(e)}>
              <div className="post-redaction">
                <textarea 
                aria-label='Champ pour ajouter le message de votre post' 
                id="textarea-form"
                placeholder={`Quoi de neuf ${userData.firstName} ?`}
                onChange={(e) => setPost(e.target.value)}
                value={post} ></textarea>
              </div>
              
              <div className="post-footer"> 
  
                <label htmlFor="imagePost">Ajoutez une image 📸 :</label>
                <input type="file" name="imagePost" id="imagePost" 
                  accept='.jpg, .jpeg, .png, .gif'
                  onChange={handleImg} 
                  value={postImgInput}
                />
                <button type='submit' className="create-post-btn" >Publiez</button>
  
  
              </div>
            </form>
  
          </div>
      </main>
    )
  }