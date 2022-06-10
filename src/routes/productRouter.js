const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

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

router.get('/detail/:id', productController.detail);

router.get('/create', authMiddleware, productController.create);
router.post('/create', uploadImgProduct.single('img'), productController.store);

router.get('/edit/:id', authMiddleware, productController.edit);
router.put('/edit/:id', uploadImgProduct.single('img'), productController.update);

router.delete('/delete/:id', productController.delete);

router.get('/:category', productController.gallery);

module.exports = router;