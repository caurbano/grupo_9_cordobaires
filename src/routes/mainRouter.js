const express = require('express');
const router = express.Router();

const MainController = require('../controllers/mainController');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');


router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);

router.get('/', MainController.home);

module.exports = router;