const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const adminController = require('../controllers/adminController');

const storageImgUser = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/img/users'))
  },
  filename: function (req, file, cb) {
      const newFieldName = 'user-' + Date.now() + path.extname(file.originalname);
      cb(null, newFieldName)
  }
});

const uploadImgUser = multer({ storage: storageImgUser });

const storageImgProduct = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/img'));
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
      cb(null, newFieldName);
    }
  })

const uploadImgProduct = multer({ storage: storageImgProduct });

// PRODUCT
router.get('/product/create', adminController.create);
router.post('/product/create', uploadImgProduct.single('img'), adminController.store);

router.get('/product/edit/:id', adminController.edit);
router.put('/product/edit/:id', uploadImgProduct.single('img'), adminController.update);

router.get('/product/delete/:id', adminController.delete);
router.delete('/product/delete/:id', adminController.destroy);

router.get('/product/result', adminController.result);

//USER

router.get('/user/list', adminController.list);
router.put('/user/:id', adminController.setAdmin);

router.get('/user/edit/:id', adminController.editUser);
router.put('/user/edit/:id', uploadImgUser.single('img'), adminController.updateUser);

router.get('/user/delete/:id', adminController.deleteUser);
router.delete('/user/delete/:id', adminController.destroyUser);

module.exports = router;