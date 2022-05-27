const router = require("express").Router();
const productController = require('../controllers/productController');

router.get("/list", productController.list);
module.exports = router;