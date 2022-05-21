const express = require('express');
const router = express.Router();
const  multer = require('multer');
const path = require('path');

const MainController = require('../controllers/MainController');

const storageImgProduct = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/img'))
    },
    filename: function (req, file, cb) {
      const newFieldName = 'product-'+ Date.now() + path.extname(file.originalname);
      cb(null, newFieldName)
    }
  })
  
  const uploadImgProduct = multer({ storage: storageImgProduct });

  const storageImgUser = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/img'))
    },
    filename: function (req, file, cb) {
      const newFieldName = 'user-' + Date.now() + path.extname(file.originalname);
      cb(null, newFieldName)
    }
  })
  
  const uploadImgUser = multer({ storage: storageImgUser });

router.get('/', MainController.home);

router.get('/product/cart', MainController.cart);

router.get('/product/detail/:product', MainController.detail);

router.get('/user/login', MainController.login);
//router.post('/login', MainController.login2);

router.get('/register', MainController.register);
router.post('/register', uploadImgUser.single('img'), MainController.register2);

router.get('/product/create', MainController.create);
router.post('/product/create', uploadImgProduct.single('img'), MainController.create2);

router.get('/product/edit/:product', MainController.edit);
//router.put('/product/edit/:product', uploadImgProduct.single('img'), MainController.edit2);

module.exports = router;