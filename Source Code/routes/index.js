//for user routes
const express= require('express');
const shopController = require('../controllers/index');
const shopController2 = require('../controllers/user/shop');
const isCheck= require('../middlewares/index/isCheck');
const router= express.Router();

router.get('/',isCheck,shopController.getIndex);
router.get('/products/:productId',shopController2.getProduct); //dynamic routtes uses controller


module.exports = router;