const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fs = require('fs')

const Password = require('../models/Password');



require('dotenv').config();

//Création d'un utilisateur
exports.signup = (req, res, next) => {
  //On vérifie si le mot de passe correspond à notre model
  if(!Password.validate(req.body.password)) {
    return res.status(400).json({
      message: 'Le mot de passe doit être au min 8 caractères, 1 majuscule et 1 chiffre'
    });
  } else if (req.body.password != req.body.passwordConfirm) {
    return res.status(400).json({
      message: ' Les mots ne sont pas identiques '
    })
    //Si le model correspond on envoie les informations de l'utilisateur à la BDD avec un mot de pas hashé
  } else if (Password.validate(req.body.password) && req.body.password === req.body.passwordConfirm){
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        isAdmin: false,
      });
      user
      .save()
      .then(() => res.status(201).json({ message: ' Utilisateur créé  ! :)'}))
      .catch(() => res.status(400).json({message: "email ou mot de passe déjà existant" }))

    })
    .catch((error) => res.status(500).json({ error },{ message: 'Objet incription incomplet ou mauvais'}))
  } 
  // console.log(req.body) ;
};

//Connexion à un compte
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then((user) => {
    if(!user){
      return res.status(401).json({
        error: 'Identifiant/mot de passe incorrecte'
      });
    } else {
      bcrypt.compare(req.body.password, user.password)
      .then((validPassword) => {
        if(!validPassword){
          return res.status(401).json({
            error: 'Identifiant/mot de passe incorrecte'
          });
        } else {
          res.status(200).json({
            userId: user._id,
            // email: user.email,
            firstName: user.firstName,
            token: jwt.sign(
              { userId: user._id},
              process.env.TOKENKEY,
              { expiresIn: '10h'}
            )
          });
        }
      })
      .catch(error => res.status(500).json({ error }))
    }

  })
  .catch(error => res.status(500).json({ error }))

};

//Recupération d'un seul utilisateur grâce à son id
exports.getOneUser = (req, res, next) => {
  // console.log(req.params.id)
  User.findOne({ _id: req.query.userId }).select('-password -email')
  .then(user => res.status(200).json(user))
  .catch(error => res.status(404).json({ error }))
}

//Recuperer tout les users
exports.getAllUsers = (req, res, next) => {
  User.find().select('-password -email ')
  .then( users => res.status(200).json(users))
  .catch(error => res.status(404).json({ error }))
};


//Modifier un utilisateur
exports.updateUser = (req, res, next) => {
  User.findOne({_id: req.params.id})
  .then((user) =>{
    
    // let imageUrl = null
  
    // vérifier qu'il y a une image a traiter
    if (req.file) {
      const filename = user.picture.split('/images/')[1];
      imageUrl = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`
      if(filename !== 'profil.jpg'){
        
        //On regarde s'il y a une image a traité puis on la supprime avec la méthode unlink de Fs  de notre dossier images
        fs.unlink(`images/${filename}`, (error) => {
          if (error) console.log({error:"Erreur de suppression de l'ancienne image"});
          else {
            console.log(`Suppression de l'ancienne images ./images: ${filename}`);
          }
        });
      }
      
    }
      User.updateOne(
        { _id: req.params.id },
        {
          $set: { picture: imageUrl},
        }
      )
        .then(() => {
          User.findById({ _id: req.params.id })
          .then((user) =>
            res.status(200).json({ picture: user.picture })
          )
        })
        .catch((err) => res.status(500).json({ msg: err }))
  })
}


//Suppression d'un utilisateur 
exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id})
  .then(user => {
    if(!user._id){
      res.status(401).json({ message: 'Non autorisé4'})
    } else if(user.picture != null){
      const filename = user.picture.split("/images")[1]
      fs.unlink(`images/${filename}`,(error) =>{
        if (error) console.log({error:"Erreur de suppression de l'ancienne image"});
        else {
          console.log(`Suppression de l'ancienne images ./images: ${filename}`);
        }
      })
        User.remove({_id: req.params.id})
        .then(() => res.status(200).json({message: 'User supprimé'}))
        .catch(error => res.status(401).json({ error}))
      
    }
  })

}









