const router = require('express').Router();
const productSchema = require('../models/product');
const slideSchema = require('../models/slider');
const auth = require('../middleware/auth');
const checkrole = require('../middleware/checkrole');
const userDashboardController = require('../controller/userDashboardController');
const addToCartController = require('../controller/addtocartController')

// router.use(auth)

router.get('/user-dashboard', auth, userDashboardController.getUserDashboard);

router.get('/user-details', auth, userDashboardController.getUserDetails);

router.post('/user-details', auth, userDashboardController.postUserDetails);

router.get('/user-address', auth, userDashboardController.getUserAddress);

router.get('/user-address-add', auth, userDashboardController.getUserAddressAdd);

router.post('/user-address-add', auth, userDashboardController.postUserAddressAdd);

router.get('/user-address-delete/:id', auth, userDashboardController.getAddressDelete);

router.get('/user-address-update/:id', auth, userDashboardController.getAddressupdate);

router.post('/user-address-update/:id', auth, userDashboardController.postAddressupdate);

router.get('/add-to-cart', auth, addToCartController.getAddtoCart);

router.get('/add-to-cart/:id', auth, addToCartController.Addaddtocart);

router.get('/remove-cart/:id', auth, addToCartController.removeCart);

router.post('/update-cart/:id', auth, addToCartController.updateCart);



module.exports = router;