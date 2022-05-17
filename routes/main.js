const express = require('express');
const router = express.Router();

const MainController = require('../controllers/MainController');

router.get('/', MainController.home);

router.get('/product/cart', MainController.cart);

router.get('/product/detail/:product', MainController.detail);

router.get('/user/login', MainController.login);
router.post('/login', MainController.login2);

router.get('/register', MainController.register);
//router.post('/register', MainController.register2);

router.get('/product/create', MainController.create);
//router.post('/product/create', MainController.create2);

router.get('/product/edit/:product', MainController.edit);
//router.put('/product/edit/:product', MainController.edit2);

module.exports = router;