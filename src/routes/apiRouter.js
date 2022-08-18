const router = require('express').Router();
const apiController = require('../controllers/apiController');


router.get('/users', apiController.usersList);
router.get('/users/:id', apiController.user);
router.get('/products', apiController.productsList);
// router.get('/products/page', apiController.productsPage);
router.get('/products/:id', apiController.product);


module.exports = router;