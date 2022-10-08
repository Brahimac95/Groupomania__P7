require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const path = require("path")


const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post")

//Connexion a notre BDD
mongoose.connect(
    process.env.MDB_SECRET,
  {   useNewUrlParser: true,
      useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !')); 


app.use(express.json());//Permet d'accéder au corps de nos requêtes contenant du json

//L'utilisation de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/auth', userRoutes)
app.use('/api/post', postRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')))//Route de l'affichage des images (Securiser le lien d'img)




module.exports = app;