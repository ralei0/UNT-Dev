const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/admin');
const isAuth = require('../../middlewares/admin/isAuth')
const ismulter = require('../../middlewares/multer');

router.get('/admin/home', isAuth, adminController.getHome);
router.get('/admin/add-product', isAuth, adminController.getAddProducts); //hm kitne v middleware jod skte hai...pehel request sbse pehle middleare mai jaayegi phir waha se next hoga tph aage jayegi...left to right aaata hai request middkeware se
router.post('/admin/add-product', isAuth, adminController.postAddProducts);
router.get('/admin/products', isAuth, adminController.getProducts);
router.get('/admin/edit-product/:productId', isAuth, adminController.getEditProduct);
router.post('/admin/edit-product', isAuth, adminController.postEditProduct);
router.post('/admin/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;