const router = require('express').Router();
const forgetpasswordController = require('../controller/forgetpasswordcontroller')



router.get('/forget', forgetpasswordController.getForgetpass);


router.post('/forget', forgetpasswordController.postForgetpass);


router.get('/forgetconfirm/:token',forgetpasswordController.getforgetemail);

router.post('/forgetconfirm/:token',forgetpasswordController.postforgetemail);


module.exports = router;