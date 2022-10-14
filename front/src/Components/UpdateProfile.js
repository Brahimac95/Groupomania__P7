import React, {useEffect, useState} from "react";
import "../Styles/Components/_updateProfile.scss";
import axios from "axios";
import { useNavigate } from "react-router";
import GaleryImg from "../assets/image-gallery.png"


export default function UpdateProfil() {
    const userDataLs = JSON.parse(localStorage.getItem("dataUser"));
    const userId = userDataLs.userId;
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [profilImgInput, setProfilImgInput] = useState("");
    // const [description, setDescription] = useState("")
    // const[firstName, setFirstName] = useState("")
    // const [lastName, setLastName] = useState("");
    const [userData, setUserData] = useState("")
  
  
    useEffect(() => {
      axios({
        method: "get",
        url:`http://localhost:5000/api/auth/${userId}` ,
        headers: {
          'Authorization': `Bearer ${userDataLs.token}`
        },
        params: {
          userId
        }
      })
      .then((res) => {
        console.log(res);
        setUserData(res.data)
  
      })
      .catch((error) => {
        console.log(error = `Erreur de recupération de donnée de l'utilisateur`)
      })
    }, [userDataLs.token, userId])
  

    //Modification du profil
    const updateProfil = () => {
      // e.preventDefault();
  
      const formData = new FormData()
      formData.append('file', file);
      // formData.append('description', description);
  
      axios.put(`http://localhost:5000/api/auth/${userId}`, formData,
      {headers: {'Authorization': `Bearer ${userDataLs.token}`},
      params: {userId},
      data: {formData}
    
      })
      .then(res =>{
      
        console.log(res);
      
      })
      .catch(error => {
      console.log(error)
      })
    }
  
  
    function handleImg (e) {
      e.preventDefault();
      setProfilImgInput(e.target.value);
      setFile(e.target.files[0])
    }
  
  
  
  
   
    return (
      <div>
        <div className="updateProfil">
          <h2>Votre profil</h2>
          <div className="card">
            <img src={userData.picture} alt="" className="img-wrap" />
            <h3>{userData.firstName} {userData.lastName} </h3>
            <form onSubmit={(e) => updateProfil(e)}  className="upload-pic"
              encType="multipart/form-data" >
              {/* <textarea name="description" id="description"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={userData.description}
              >
              </textarea> */}
              {/* <label htmlFor="file">Ajoutez une image</label> */}
              <label htmlFor="file" className="modify-post-input-label" >
                Ajoutez une image <img src={GaleryImg} alt="icon galerie" />
              </label>
              <input type="file" 
                  id="file" 
                  name='file' 
                  accept='.jpg, .jpeg, .png,'
                  onChange={handleImg}
                  value={profilImgInput}
                  
              />
              <br />
              <button type='submit'>Enregistrer</button>
          </form>
          </div>
  
  
        </div>
  
      </div>
    )
  }