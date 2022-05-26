const express = require('express');
const router = express.Router();
const  multer = require('multer');
const path = require('path');
const fs = require('fs');

const MainController = require('../controllers/MainController');

const storageImgProduct = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/img'))
    },
    filename: function (req, file, cb) {

      const productsFilePath = path.join(__dirname, '../data/products.json');
      let products = fs.readFileSync(productsFilePath, 'utf-8');
      let array;
      let ide;
			if(products != undefined){
				products = JSON.parse(products);
				array = products;
        ide = parseInt(array[array.length - 1].id) + 1;
			} else {
        ide = 1;
			}

      const newFieldName = 'product-'+ ide + '-' + req.body.name + path.extname(file.originalname);
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

router.get('/user/edit/:id', MainController.editUser);
router.put('/user/edit/:id', uploadImgUser.single('img'), MainController.updateUser);
router.delete('/user/delete/:id', MainController.deleteUser);

router.get('/product/create', MainController.create);
router.post('/product/create', uploadImgProduct.single('img'), MainController.store);

router.get('/product/edit/:product', MainController.edit);
router.put('/product/edit/:product', uploadImgProduct.single('img'), MainController.update);

router.delete('/product/delete/:product', MainController.delete);

router.get('/product/:category', MainController.gallery);

module.exports = router;