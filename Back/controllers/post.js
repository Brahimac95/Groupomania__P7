const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');


//======================CRUD POST============================//


//Affichage de tout les posts
exports.getAllPosts = (req, res, next) => {
    Post.find()
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}))
}

//Afficher un seul post
exports.getOnePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({error}))
}

//Création d'un post
exports.createPost = (req, res, next) => {
    const objectPost = req.body;
    const post = new Post({
        ...objectPost,
        //On regarde s'il ya une image dans le post sinon on envoie un string vide
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ""
    })
    post
    .save()//On enregistre dans la BDD
    .then(() =>  {res.status(201).json(post)})
    .catch(error => res.status(400).json({ error }))

};



//Modification d'un post
exports.updatePost = (req, res, next) => {
    //récupère user et post
    const post =  Post.findOne({ _id: req.params.id})
    const user =  User.findOne({ _id:req.body.userId })
    // console.log(req.body.userId)
    //On vérifie si celui qui veut modifier est autorisé a le faire ou pas 
    const userAuthorized = user.isAdmin || req.body.userId === post.userId
    //Lorque la modification contient un changement
    const postObject = req.file ? {...req.body, imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,} : { ...req.body };
    
    //si l'utilisateur n'est pas autorisé, message d'erreur
    if(!userAuthorized){
      return  res.status(403).json({ error: new Error("Vous n'êtes pas autorisé") });
    }
    //Si la modification contient un image on l'ajoute puis on supprime l'ancienne
    if (req.file) {
      Post.findOne({ _id: req.params.id })
        .then((post) => {
            const filename = post.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => { 
          
            Post.findOneAndUpdate(
              { _id: req.params.id },
              { ...postObject, _id: req.params.id }
            )
              .then(() => {
                res.status(200).json({ message: "Post mise à jour!" });
              })
              .catch((error) => {
                res.status(400).json({ error });
              });
            })
          })
          .catch((error) => {
            res.status(500).json({ error });
          })
      //le mettre à jour
    } else {           
        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Post modifier( Modify ) !' }))
        .catch(error => res.status(400).json({ error }));
    }
  };
  

  //Suppression d'un post
exports.deletePost = (req, res, next)=>  {
    User.findOne({ _id: req.auth.userId})
    .then((user) => {
        Post.findOne({ _id: req.params.id})
        .then((post) => {
            if (post.userId != req.auth.userId && user.admin == 'false') {
                res.status(401).json({ message: "Vous n'êtes pas autorisé "})
            } else {
                try {
                    Post.findOne({ _id: req.params.id}).then((post) => {
                        if (post.imageUrl) {
                            const filename = post.imageUrl.split('images/')[1]
                            fs.unlink(`images/${filename}`, error => {
                                console.log(`image supprimé de ${filename} `)
                                if(error) throw error
                                console.log(error)
                            })
                        } else {
                            console.log('Post sans fichier image')
                        }
                        Post.deleteOne({ _id: req.params.id}).then((postDelete) => {
                            res.status(200).json({postDelete})
                            console.log('Post supprimé')
                        })
                        .catch((error) => res.status(400).json({ error }))
                    })
                }
                catch (error){
                    res.status(500).json({error})
                }
            }
        })
    })
};


//Systeme de like
exports.likePost = (req, res, next) => {
    let postId = req.body.id
    let like = req.body.like
    let userId = req.body.userId
    // console.log(req.body)

    //Quand un user like  un post
    Post.findOne({_id: postId})
    .then((post) => {
        if(like === 1){
            Post.updateOne({ _id: postId}, {
                $inc: {likes: like},//On ajoute le like avec ma méthode $inc de mongoBD puis on push l'id du user qui à liké
                $push: {usersLiked: userId}
            })
            .then(() => res.status(200).json({ mesage : 'Vous avez ajouté un like !'}))
            .catch(error => res.status(400).json({ error }));
        }
        //Lorsqu'un user annule son like
        else if(like === 0) {
            Post.updateOne({ _id: postId}, {

                $inc: {likes: -1},//On 
                $pull: { usersLiked: userId}//On retire l'id du tableau
            })
            .then(() => res.status(200).json({ message : `Vous retirez votre like ! `}))
            .catch(error => res.status(400).json({ error }));
        }
    })
}


































// let usersLikedArray = []
// //Like des posts
// exports.likePost = (req, res, next) => {
//     let postId = req.body.id
//     let userId = req.body.userId;
//     let like = req.body.like
   
//     // console.log(req.body)
    
//     //Quand un utilisateur Like un post
//     Post.findOne({ _id: postId })
//     .then((post) => {
//         if(!like === 1){
//             usersLikedArray = usersLiked
//             let tochange = {
//                 $inc: {likes: 1}, //$inc est une méthode d'incrémentation de MgDB
//                 $push: {usersLiked: userId}//On push dans le array usersLiked

//             }
//             Post.updateOne({_id: postId},tochange)

//             .then((updatePost) => res.status(200).json({ message : 'Vous avez ajouté un like !', updatePost}))
//             .catch(error => res.status(400).json({ error }));
//         }
//         //Quand il supprime ou annule son like
//         else if (post.usersLiked.includes(userId)) {
// 			Post.updateOne(
// 				{ _id: req.params.id },

// 				{ $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
// 			)
// 				.then(() => {
// 					Post.findOne({ _id: req.params.id }).then((updatedPost) =>
// 						res.status(200).json({ message: 'Vous avez retirer votre like', updatedPost })
// 					)
// 					// res.status(200).json({ message: 'Post unliked', post })
// 				})
// 				.catch((error) => res.status(400).json({ error }))
// 		}
// 	})
// }

// // L'utilisateur aime / n'aime pas une post
// // exports.likePost = (req, res, next) => {
// //     const postId = req.body.id;
// //     const userId = req.body.userId;
// //     const like = req.body.like;

// //     // L'utilisateur aime une post pour la première fois (like === 1)
// //     // On incrémente + 1 au nombre de like, et on push le userId dans le tableau userLiked
// //     if (like === 1) {
// //         Post.updateOne(
// //             { _id: postId },
// //             {
// //                 $push: { usersLiked: userId },
// //                 $inc: { likes: like },

// //             }
// //         )
// //             .then((post) => res.status(200).json({ message: "post appréciée" }))
// //             .catch((error) => res.status(500).json({ error }));
// //     }


// //         // L'user change d'avis
// //     // L'utilisateur retire son like
// //     else if (like === 0) {
// //         Post.findOne({ _id: postId })
// //             .then((post) => {
// //                 if (post.usersLiked.includes(userId)) {
// //                     Post.updateOne(
// //                         { _id: postId },
// //                         { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
// //                     )
// //                         .then((post) => {
// //                             res.status(200).json({ message: "post dépréciée" });
// //                         })
// //                         .catch((error) => res.status(500).json({ error }));
// //                     // L'utilisateur retire son dislike
// //                  } //else if (post.usersDisliked.includes(userId)) {
// //                 //     Post.updateOne(
// //                 //         {_id: postId},
// //                 //         {
// //                 //             $pull: {usersDisliked: userId},
// //                 //             $inc: {dislikes: -1},
// //                 //         }
// //                 //     )
// //                 //         .then((post) => {
// //                 //             res.status(200).json({message: "Avis neutre"});
// //                 //         })
// //                 //         .catch((error) => res.status(500).json({error}));
// //                 // }
// //             })
// //             .catch((error) => res.status(401).json({ error }));
// //     }
// // };

// //Commenté les posts

// exports.commentPost = (req, res, next) =>  {
//     let postId = req.params.id
//     let userId = req.body.userId;
//     // console.log(req.body)

//     Post.findOne({ _id: postId})
//     .then((post)=> {
//         if(!post.usersCommented.includes(userId)) {
//             Post.updateOne({_id: postId}, {
//                 $push: {
//                     comments: {
//                         text: req.body.text,
//                         commenterLastName:req.body.commenterLastName,
//                         timestamps: new Date().getTime()
//                     },
//                     usersCommented: userId
//                 }
//             })
//             .then((comment) => res.status(200).json({comment, message : 'Vous avez ajouté un commentaire !'}))
//             .catch(error => res.status(400).json({ error }));
//         }
//     })
//     .catch(error => res.status(400).json({ message: "Erreur commentaire" }));


// }


// exports.editCommentPost = (req, res, next) => {
//     // Post.findOne({_id: req.params.id})
//     // console.log(req.body);
//     try{
//         Post.updateOne({_id: req.params.id}, (err, posts) => {
//             const theComment = posts.comments.findOne(() => {
//                 comments._id.equals(req.body.commentId)
//             });
//             if(!theComment){
//                 return res.status(404).json({ message: 'Commentaire introuvable'})
//             } else {
//                 theComment.text = req.body.text;
//                 posts.save().then(() => res.status(200).json({ message: 'Commentaire modifié'}))
//                 .catch(err => res.status(500).json(err))
//             }
//         })
//     }
//     catch (err) {
//         return res.status(404).json(err)


//     }

// }


// // exports.deletePost = (req, res, next) => {
// //     Post.findOne({ _id: req.params.id})
// //     try{
// //         Post.findByIdAndUpdate({ _id: req.params.id},
// //             {
// //                 $pull: {
// //                     comments: {
// //                         _id: req.body.commentId,
// //                     }
// //                 }
// //             }
// //             ) 
// //             .then(() => res.status(200).json({ message : 'Commentaire supprimé !'}))
// //             .catch(error => res.status(400).json({ error }))

// //     }
// //     catch (err) {
// //         return res.status(400).json({ err })

// //     }

// // }
// exports.deleteCommentPost = (req, res, next) => {
//     try {
//       Post.findOne({ id: req.params.id });
//       if(comments._id == req.body.commentId) {
//         Post.deleteOne({ id: req.params.id });
//         res.status(200).json({ message: "Comment has been deleted" });
//       } else {
//         return res.status(403).send({ message: 'Vous n\'avez pas les droits pour ... '});
//       }
//     } catch (error) {
//       res.status(400).json({ message:"Bad request" });
//     }
//   };

