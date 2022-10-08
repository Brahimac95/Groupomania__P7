const express = require('express');
const router = express.Router();
const multer = require("../middlewares/multer-config")

const auth = require('../middlewares/auth')

const userCtrl = require('../controllers/user');//Logique metier du user

// const limiter = require('../middlewares/limiter')
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


//CRUD User
router.get('/', userCtrl.getAllUsers)
router.get('/:id',auth , userCtrl.getOneUser)
router.put('/:id', auth, multer, userCtrl.updateUser)
router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router;