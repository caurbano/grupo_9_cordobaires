const express = require('express');
const routerUsers = express.Router();
const multer = require('multer');
const path = require('path');

const usersController = require('../controllers/userController');
const validatorRegister = require('../middlewares/validatorRegister');
const validatorLogin = require('../middlewares/validatorLogin');
const storageImgUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img/users'))
    },
    filename: function (req, file, cb) {
        const newFieldName = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFieldName)
    }
});

const uploadImgUser = multer({ storage: storageImgUser });

routerUsers.get('/login', usersController.login);
routerUsers.post('/login', validatorLogin, usersController.login2);


routerUsers.get('/register', usersController.register);
routerUsers.post('/register', uploadImgUser.single('img'), validatorRegister, usersController.register2);

routerUsers.get('/edit/:id', usersController.editUser);
routerUsers.put('/edit/:id', uploadImgUser.single('img'), usersController.updateUser);

routerUsers.delete('/delete/:id', usersController.deleteUser);

routerUsers.get('/result', usersController.result);

module.exports = routerUsers;
