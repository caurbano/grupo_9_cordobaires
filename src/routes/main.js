const express = require('express');
const router = express.Router();
const  multer = require('multer');
const path = require('path');

const MainController = require('../controllers/MainController');

const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/img'))
    },
    filename: function (req, file, cb) {
      const newFieldName = 'product-';
      cb(null, newFieldName)
    }
  })
  
  const upload1 = multer({ storage: storage1 });

  const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/img'))
    },
    filename: function (req, file, cb) {
      const newFieldName = 'user-';
      cb(null, newFieldName)
    }
  })
  
  const upload2 = multer({ storage: storage2 });

router.get('/', MainController.home);

router.get('/product/cart', MainController.cart);

router.get('/product/detail/:product', MainController.detail);

router.get('/user/login', MainController.login);
//router.post('/login', MainController.login2);

router.get('/register', MainController.register);
//router.post('/register', upload2.single('img'), MainController.register2);

router.get('/product/create', MainController.create);
router.post('/product/create', upload1.single('img'), MainController.create2);

router.get('/product/edit/:product', MainController.edit);
//router.put('/product/edit/:product', MainController.edit2);

module.exports = router;