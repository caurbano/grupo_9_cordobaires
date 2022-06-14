const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

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

router.get('/create', authMiddleware, adminMiddleware, productController.create);
router.post('/create', uploadImgProduct.single('img'), productController.store);

router.get('/edit/:id', authMiddleware, adminMiddleware, productController.edit);
router.put('/edit/:id', uploadImgProduct.single('img'), productController.update);

router.get('/delete/:id', productController.delete);
router.delete('/delete/:id', productController.destroy);

router.get('/result', authMiddleware, adminMiddleware, productController.result);

router.get('/gallery', productController.gallery);
router.get('/gallery/:category', productController.category);

module.exports = router;