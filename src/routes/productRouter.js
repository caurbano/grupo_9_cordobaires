const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const productController = require('../controllers/productController');

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

router.get('/cart', productController.cart);

router.get('/detail/:product', productController.detail);

router.get('/create', productController.create);
router.post('/create', uploadImgProduct.single('img'), productController.store);

router.get('/edit/:product', productController.edit);
router.put('/edit/:product', uploadImgProduct.single('img'), productController.update);

router.delete('/delete/:product', productController.delete);

router.get('/:category', productController.gallery);

module.exports = router;