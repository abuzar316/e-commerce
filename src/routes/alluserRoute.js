const router = require('express').Router();
const auth = require('../middleware/auth');
const user = require('../models/user');
const checkrole = require('../middleware/checkrole')

router.get('/', auth, checkrole, async (req, res) => {
    try {
        // console.log("helloooo");
        const data = await user.find()
        res.json(data)

    } catch (error) {
        console.log(error);
    }
});





module.exports = router;