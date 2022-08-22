const express = require('express');
const routerUsers = express.Router();
const multer = require('multer');
const path = require('path');

const usersController = require('../controllers/userController');
const validatorRegister = require('../middlewares/validatorRegister');
const validatorLogin = require('../middlewares/validatorLogin');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validatorEditUser = require('../middlewares/validatorEditUser');

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

//Login de usuarios
routerUsers.get('/login', guestMiddleware, usersController.login);
routerUsers.post('/login', validatorLogin, usersController.processLogin);

//Registro de usuarios
routerUsers.get('/register', guestMiddleware, usersController.register);
routerUsers.post('/register', uploadImgUser.single('img'), validatorRegister, usersController.processRegister);

//Edición de usuarios (propia cuenta)
routerUsers.get('/edit', authMiddleware, usersController.editUser);
routerUsers.put('/edit', uploadImgUser.single('img'), validatorEditUser, usersController.updateUser);

//Eliminación de cuenta (propia)
routerUsers.get('/delete', authMiddleware, usersController.deleteUser);
routerUsers.delete('/delete', usersController.destroyUser);

//Perfil de usuario
routerUsers.get('/profile', authMiddleware, usersController.profile);

//Logout de usuario
routerUsers.get('/logout', authMiddleware, usersController.logout);

//Agregar producto al carrito del usuario
routerUsers.post('/addproduct/:id', authMiddleware, usersController.addProduct);

routerUsers.post('/buy', authMiddleware, usersController.buy);

routerUsers.post('/deleteCart/:id', authMiddleware, usersController.deleteCart);

module.exports = routerUsers;
