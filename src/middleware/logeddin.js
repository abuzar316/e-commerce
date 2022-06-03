const loginuser = require('../models/loginuser');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    const token = req.cookies.jwtToken;
    let user_info = false;
    if (token) {
        const verifyuser = jwt.verify(token, process.env.KEY);
        const user = await loginuser.findOne({ _id: verifyuser._id });
        user_info = user ? true : false
    }
    req.logeddin = user_info;
    next()
}