import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import '../Styles/Components/_cardPost.scss'
import HeartPlein from '../assets/Heart-plein.svg'
import Heartvide from '../assets/Heart-vide.svg'


export default function CardPost({post}) {

    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem('dataUser'));
    const userId = userData.userId ;
    const [id, setId] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [liked, setLiked] = useState(post.usersLiked.includes(userId));
    const [numberLike, setNumberLike] = useState(post.usersLiked.length);


    useEffect(() =>{
        setLiked(post.usersLiked.includes(userId))

        axios({
          method: "get",
          url:`http://localhost:5000/api/auth/${userId}`,
          credentials: true,
          headers: {
            'Authorization': `Bearer ${userData.token}`
          },
          params: {
            userId
            
          }
        })
        .then((res) => {
            // console.log(res)
            setId(res.data._id)
            if(res.data.isAdmin === true){
                setIsAdmin(true)
            } else{
                setIsAdmin(false)
            }

            
         
        })
        .catch((err) => {
          console.log(err);
        })
    
    
    
    }, [userData.token, userId]);


    //Fonction de Like
    const like = () => {

        fetch("http://localhost:5000/api/post/like", {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.token}`

            },
            body: JSON.stringify({
                like: 1, userId: id, id: post._id

            })
            
        })
        .then((res) => {
            // console.log(res)
            setLiked(true);
            setNumberLike(numberLike +1)

        })
        .catch((err) => {
            console.log(err);
        })

    }

    //Fonction Unlike
    const unlike = () => {
        fetch("http://localhost:5000/api/post/like", {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.token}`

            },
            body: JSON.stringify({
                like: 0, userId: id, id: post._id

            })
            
        })
        .then((res) => {
            // console.log(res)
            setLiked(false);
            setNumberLike(numberLike -1)

        })
        .catch((err) => {
            console.log(err);
        })

    }



    //Recupération des date renvoyé par MongoDb
    const datePaser = (num) => {
        
        let options = {hour: "2-digit", minute: "2-digit" , day: "numeric",
        weekday: "long", year: "numeric", month: "short"}
       
        let timestamp = Date.parse(num)
        let date = new Date(timestamp).toLocaleDateString('fr-FR' , options)
        return date.toString()
    }
    // Redirection to modify product
    const modifyPost = () => {
        navigate(`/post/${post._id}`);
    };
    
    




  return (
    <>
    <article className='card-post'>
        <div className="card-header">
            <p className='card-name'>Publié par :{" "}{post.firstName}</p>
            <p className='card-date'>Le {datePaser(post.createdAt)}</p>
        </div>
        

        <img src={post.imageUrl}  className='card-img' alt='' />
        <p className='card-text'> {post.post}</p>
        <div className="card-footer">
            {/*Lorsqu'un user ajouter un like*/}
            {liked === true && (<img src={HeartPlein} className="fa-regular fa-heart like" onClick={unlike}/> )}
            {/* Lorsuq'un user annule son like */}
            {liked === false && (<img src={Heartvide}
                    className="fa-regular fa-heart like" onClick={like}/> )}

                {/*/!*if user dislike post*!/*/}
                {/* {liked === false && (<button className="card-post-button-like" aria-label="button for like"><i
                    className="fa-regular fa-heart" onClick={like}></i></button>)}
         */}
             {/*if post was created by user or if user isAdmin*/}
         {id === post.userId && (<button className="modify-btn" onClick={modifyPost}>Modifier</button>) ||
                isAdmin && (<button className="modify-btn" onClick={modifyPost}>Modifier</button>)}
         
            

        </div>

         {/*if post.userLiked.length === 0*/}
         {numberLike === 0 && (<p className="card-post-number-like">{numberLike} like</p>)}
            {/*if post.userLiked.length === 1*/}
            {numberLike === 1 && (<p className="card-post-number-like">{numberLike} like</p>)}
            {/*if post.userLiked.length > 1*/}
            {numberLike > 1 && (<p className="card-post-number-like">{numberLike} likes</p>)}
        
         

    </article>

    </>
   
  )
}
