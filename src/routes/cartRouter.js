const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

//Ir al carrito de compras
router.get('/', authMiddleware, cartController.cart);

module.exports = router;