const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const adminRouter = require('./adminRouter');
const apiRouter = require('./apiRouter');

const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const userCookie = require('../middlewares/userCookie');

//Usuarios
router.use("/user", userCookie, userRouter);
//Productos
router.use("/product", productRouter);
//Carrito de compras
router.use("/cart", cartRouter);
//Perfil ADMIN
router.use("/admin", authMiddleware, adminMiddleware, adminRouter);
//Home
router.get('/', mainController.home);
router.get('/error', mainController.error404);

//API
router.use("/api", apiRouter);

module.exports = router;