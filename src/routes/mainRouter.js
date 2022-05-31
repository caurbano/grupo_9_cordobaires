const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const MainController = require('../controllers/mainController');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

router.use("/user", userRouter);
router.use("/product", productRouter);

router.get('/', MainController.home);

module.exports = router;