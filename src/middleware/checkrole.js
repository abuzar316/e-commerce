const users = require('../models/user');

const checkrole = async (req, res, next) => {
    try {
        const userid = req.user.user_id.toString();
        const userDB = await users.findOne({_id:userid});
        if(userDB.role == 'admin'){
            next()
        }else{
            // res.status(400).json("not authorized")
            res.status(400).render('errorpage')
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = checkrole;