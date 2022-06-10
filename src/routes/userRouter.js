const express = require('express');
const routerUsers = express.Router();
const multer = require('multer');
const path = require('path');

const usersController = require('../controllers/userController');
const validatorRegister = require('../middlewares/validatorRegister');
const validatorLogin = require('../middlewares/validatorLogin');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

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

routerUsers.get('/login', guestMiddleware, usersController.login);
routerUsers.post('/login', validatorLogin, usersController.processLogin);


routerUsers.get('/register', guestMiddleware, usersController.register);
routerUsers.post('/register', uploadImgUser.single('img'), validatorRegister, usersController.processRegister);

routerUsers.get('/edit/:id', usersController.editUser);
routerUsers.put('/edit/:id', uploadImgUser.single('img'), usersController.updateUser);

routerUsers.delete('/delete/:id', usersController.deleteUser);

routerUsers.get('/result', usersController.result);


routerUsers.get('/list', usersController.list);
//routerUsers.get('/profile/:id', usersController.profile);
routerUsers.get('/profile', authMiddleware, usersController.profile);

//logout
routerUsers.get('/logout', usersController.logout);






module.exports = routerUsers;
