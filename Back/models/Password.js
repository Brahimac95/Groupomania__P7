const passwordValidator = require('password-validator');

//Création du schema pour le renforcement de mot de passe
const passwordSchema = new passwordValidator();


passwordSchema
.is()
.min(8)                                    // Minimum length 8
.is()
.max(100)                                  // Maximum length 100
.has()
.uppercase(1)                              // Must have uppercase 1 letters
.has()
.lowercase()                              // Must have lowercase letters
.has()
.digits(1)                                // Must have at least 1 digits
.has()
.not()
.spaces()                           // Should not have spaces
.is()
.not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


module.exports = passwordSchema;