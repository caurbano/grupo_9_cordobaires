const express = require('express');
const routerUsers = express.Router();
const multer = require('multer');
const path = require('path');

const usersController = require('../controllers/userController');

const storageImgUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img/users'))
    },
    filename: function (req, file, cb) {
        const newFieldName = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFieldName)
    }
})


// const { body, check } = require('express-validator');

// let validateLogin = [
//     check('email')
//     .notEmpty().withMessage('Debes completar este campo con tu email de registro').bail()
//     .isEmail().withMessage('Debes ingresar un email válido'),
//     check('password')
//     .notEmpty().withMessage('Debes completar este campo con tu contraseña').bail()
//     .isLength({ min: 6 }).withMessage('La contraseña debe contener 6 caracteres como mínimo')
// ]; 

const uploadImgUser = multer({ storage: storageImgUser });

routerUsers.get('/login', usersController.login);
// routerUsers.post('/login', validateLogin, usersController.login2);

routerUsers.get('/register', usersController.register);
routerUsers.post('/register', uploadImgUser.single('img'), usersController.register2);

routerUsers.get('/user/edit/:id', usersController.editUser);
routerUsers.put('/user/edit/:id', uploadImgUser.single('img'), usersController.updateUser);

routerUsers.delete('/user/delete/:id', usersController.deleteUser);

routerUsers.get('/result', usersController.result);

module.exports = routerUsers;
