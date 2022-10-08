//Vérification du token d'authentification du l'utilisateur 

const jwt = require('jsonwebtoken');//Package jsonwebtoken

require('dotenv').config;//Variable d'environnement

//On exporte notre middleware de recuperation du token ds nos routes sauce
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];//On espace le Bearer du token pour ensuite le recupérer
        const decodedToken = jwt.verify(token, process.env.TOKENKEY); //on decode le token recupereé avec méthode verify de jwt et la clé secrète 
        const userId = decodedToken.userId;//on recupère le userId

        req.auth = {userId: userId}//l'objet de la valeur de la req qui sera transmis par la suite à nos routes
        next()
    }
    catch(error) {
        res.status(401).json({ message: "Token d'authentification invalide " });
    }
};