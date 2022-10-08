const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')//Recupération et vérification du token avant toute autre action
const multer = require('../middlewares/multer-config');//on appelera multer avant de valider la création ou modification d'une sauce

const postCtrl = require('../controllers/post');//on recupère la logique metier des sauces



router.get('/', auth, postCtrl.getAllPosts);//Permet de recupérer toutes les posts
router.get('/:id', auth, postCtrl.getOnePost);//Permet de recupérer une post par son id
router.post('/', auth, multer, postCtrl.createPost);//Permet de créer et enregistrer une post
router.put('/:id', auth, multer, postCtrl.updatePost);//Permet de modifier la post
router.delete('/:id', auth, postCtrl.deletePost);//Permet de supprimer la post
router.post('/like',auth, postCtrl.likePost)//les likes des utilisateurs


//Routes commentaire
// router.post('/:id/comment',  postCtrl.commentPost);
// router.put('/:id/editComment', postCtrl.editCommentPost);
// router.delete('/:id/deleteComment', postCtrl.deleteCommentPost);




module.exports = router;