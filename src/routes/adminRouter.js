const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminController = require('../controllers/adminController');
const validatorProduct = require('../middlewares/validatorProduct');
const validatorEditUser = require('../middlewares/validatorEditUser');

const storageImgUser = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/img/users'))
  },
  filename: function (req, file, cb) {
      const newFieldName = 'user-' + Date.now() + path.extname(file.originalname);
      cb(null, newFieldName);
  }
});

const uploadImgUser = multer({ storage: storageImgUser });

const storageImgProduct = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/img'));
    },
    filename: function (req, file, cb) {
      console.log('Estoy en multer');
      const newFieldName = 'product-' + Date.now() + path.extname(file.originalname);
      cb(null, newFieldName);
    }
  })

const uploadImgProduct = multer({ storage: storageImgProduct });

// PRODUCT
router.get('/product/create', adminController.create);
router.post('/product/create', uploadImgProduct.single('img'), validatorProduct, adminController.store);

router.get('/product/edit/:id', adminController.edit);
router.put('/product/edit/:id', uploadImgProduct.single('img'), validatorProduct, adminController.update);

router.get('/product/delete/:id', adminController.delete);
router.delete('/product/delete/:id', adminController.destroy);

router.get('/product/result', adminController.result);

//USER

router.get('/user/list', adminController.list);
router.put('/user/:id', adminController.setAdmin);

router.get('/user/edit/:id', adminController.editUser);
router.put('/user/edit/:id', uploadImgUser.single('img'), validatorEditUser, adminController.updateUser);

router.get('/user/delete/:id', adminController.deleteUser);
router.delete('/user/delete/:id', adminController.destroyUser);

module.exports = router;