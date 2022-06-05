const router = require("express").Router();

const cartController = require("../controllers/cartController");

router.get('/', cartController.cart);

module.exports = router;