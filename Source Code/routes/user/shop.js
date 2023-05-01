const express= require('express');
const shopController = require('../../controllers/user/shop');
const isAuth = require('../../middlewares/user/isAuth');

const router= express.Router();

router.get('/home',isAuth,shopController.getHome);
router.post('/search',shopController.getSearch);
router.get('/cart',isAuth,shopController.getCart);
router.post('/cart',isAuth,shopController.postCart);
router.post('/delete-cart-item',isAuth,shopController.postCartDeleteItem);
router.get('/orders',isAuth,shopController.getOrders);
 // router.get('/checkout',shopController.getCheckout);
router.post('/create-order',isAuth,shopController.postOrder);
router.get('/products/:productId',shopController.getProduct); //dynamic routtes uses controller



module.exports = router;