const router = require('express').Router();
const productSchema = require('../models/product');
const slideSchema = require('../models/slider');
const auth = require('../middleware/auth');
const checkrole = require('../middleware/checkrole');
const addtocartSchema = require('../models/addToCart');


router.get('/', async (req, res) => {
    try {
        const allproduct = await productSchema.find();
        const allslider = await slideSchema.find();
        const temData = { allproduct: allproduct.reverse(), allslider, user_info: req.logeddin }
        // console.log(req.user);
        res.render('index', temData);
    } catch (error) {
        console.log(error);
    }
});


router.get('/details',(req,res)=>{
    res.render('product-details',{ user_info: req.logeddin });
})


module.exports = router;