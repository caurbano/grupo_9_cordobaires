const router = require('express').Router();
const apiController = require('../controllers/apiController');


router.get('/users', apiController.usersList);
router.get('/users/:id', apiController.user);
router.get('/products', apiController.productsList);
router.get('/products/:id', apiController.product);
// router.post('/createcart', apiController.createCart);


module.exports = router;