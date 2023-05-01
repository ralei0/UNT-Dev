const express = require('express');
const router = express.Router();
const authController = require('../../controllers/user/userAuth');
const profileController = require('../../controllers/user/profile');
const isAuth = require('../../middlewares/user/isAuth');
const isCheck = require('../../middlewares/user/isCheck');

router.get('/login', isCheck, authController.getLogin);
router.post('/login', isCheck, authController.postLogin);
router.get('/register', isCheck, authController.getRegister);
router.post('/register', isCheck, authController.postRegister);
router.post('/logout', isAuth, authController.postLogout);
router.post('/profile', profileController.createProfile2);
router.get('/profile', profileController.createProfile);



module.exports = router;