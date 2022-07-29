const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const productController = require('../controllers/productController');
const { resolvePtr } = require("dns");

//Detalle de producto
router.get('/detail/:id', productController.detail);

//Galería completa de productos
router.get('/gallery', productController.gallery);

//Galería de productos: por categoría
router.get('/gallery/:category', productController.category);

//Búsqueda de productos
router.post('/search', productController.search);

module.exports = router;