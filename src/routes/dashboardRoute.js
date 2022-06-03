const router = require('express').Router();
const slideController = require('../controller/sliderController');
const productController = require('../controller/productController');
const profileController = require('../controller/profileController');
const uploads = require('../middleware/uploads');
const auth = require('../middleware/auth');
const checkrole = require('../middleware/checkrole');

// home dashboard
router.get('/dashboard', auth, checkrole, (req, res) => {
    const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
    res.render('dashboard/dashboard', { profile_pic })
})

// product routes
router.get('/dashboard/addpost', auth, checkrole, productController.getaddProduct);

router.post('/dashboard/addpost', auth, checkrole, uploads, productController.product);

router.get('/dashboard/editpost/:id', auth, checkrole, productController.geteditproduct);

router.post('/dashboard/editpost/:id', auth, checkrole, uploads, productController.posteditproduct);

router.get('/dashboard/deletepost/:id', auth, checkrole, productController.deleteproduct);

router.get('/dashboard/allpost', auth, checkrole, productController.getallproduct);

router.post('/dashboard/allpost', auth, checkrole, productController.postallproduct);


// slider routes
router.get('/dashboard/all-slide', auth, checkrole, slideController.allslide);

router.get('/dashboard/all-slide/add', auth, checkrole, slideController.getslide);

router.post('/dashboard/all-slide/add', auth, checkrole, uploads, slideController.addslide);

router.get('/dashboard/all-slide/update/:id', auth, checkrole, slideController.updateslide);

router.post('/dashboard/all-slide/update/:id', auth, checkrole, uploads, slideController.postupdateslide);

router.get('/dashboard/all-slide/delete/:id', auth, checkrole, slideController.deleteslide);

// profile routes
router.get('/dashboard/profile', auth, checkrole, profileController.getadminProfile);

router.post('/dashboard/profile', auth, checkrole, profileController.updateadminProfile);

router.get('/dashboard/changepassword', auth, checkrole, profileController.getChangepass);

router.post('/dashboard/changepassword', auth, checkrole, profileController.postChangepass);

router.get('/dashboard/profile/pic', auth, checkrole, profileController.getProfilepic);

router.post('/dashboard/profile/pic', auth, checkrole, uploads, profileController.postProfilepic);

// website setting 
router.get('/dashboard/settings', auth, checkrole, uploads, profileController.getwebsetting);

// all user get
router.get('/dashboard/alluser', auth, checkrole, profileController.getalluser);


router.get('/dashboard/alluser/update/:id', auth, checkrole, profileController.getupdateuser);

router.get('/dashboard/alluser/delete/:id', auth, checkrole, profileController.getdeleteuser);


module.exports = router;