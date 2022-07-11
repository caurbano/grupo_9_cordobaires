const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const adminRouter = require('./adminRouter');

const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/admin", authMiddleware, adminMiddleware, adminRouter);
router.get('/', mainController.home);

module.exports = router;