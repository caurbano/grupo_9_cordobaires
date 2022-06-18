const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const productController = require('../controllers/productController');

router.get('/detail/:id', productController.detail);

router.get('/gallery', productController.gallery);
router.get('/gallery/:category', productController.category);

module.exports = router;