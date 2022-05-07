const express = require('express');
const router = express.Router();

const MainController = require('../controllers/MainController');

router.get('/', MainController.home);
router.get('/productCart', MainController.cart);
router.get('/productDetail', MainController.detail);
router.get('/login', MainController.login);
router.get('/register', MainController.register);
router.get('/productCreate', MainController.create);

module.exports = router;