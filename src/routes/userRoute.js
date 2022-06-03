const router = require('express').Router();
const auth = require('../middleware/auth');
const userController = require('../controller/userController');

router.get('/register', userController.getregisterController);

router.post('/register', userController.registerController);

router.get('/login', userController.getloginController);

router.post('/login', userController.loginController);

router.get('/logout', auth, userController.logoutController);


module.exports = router;