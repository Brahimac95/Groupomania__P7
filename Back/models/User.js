const mongoose = require('mongoose');
//Permet de vérifier que le mail enregistré sera unique
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordConfirm: { type: String, require: true },
  picture: { type: String, default: "http://localhost:5000/images/profil.jpg"},
  isAdmin: { type: Boolean, require: true },
}, 
{ timestamps: true}
);

//applique uniqueValidator a userSchema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
