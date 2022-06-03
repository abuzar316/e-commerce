const router = require('express').Router();
const notFoundController = require('../controller/notfoundController')

router.post('*', notFoundController.notFoundController);

router.get('*', notFoundController.notFoundController);

router.put('*', notFoundController.notFoundController);

router.delete('*', notFoundController.notFoundController);

module.exports = router;