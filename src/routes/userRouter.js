const express = require('express');
const routerUsers = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const usersController = require('../controllers/userController');

const storageImgUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img'))
    },
    filename: function (req, file, cb) {
        const newFieldName = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFieldName)
    }
})

const uploadImgUser = multer({ storage: storageImgUser });

routerUsers.get('/login', usersController.login);
//routerUsersUsers.post('/login', MainController.login2);

routerUsers.get('/register', usersController.register);
routerUsers.post('/register', uploadImgUser.single('img'), usersController.register2);

routerUsers.get('/user/edit/:id', usersController.editUser);
routerUsers.put('/user/edit/:id', uploadImgUser.single('img'), usersController.updateUser);
routerUsers.delete('/user/delete/:id', usersController.deleteUser);

module.exports = routerUsers;