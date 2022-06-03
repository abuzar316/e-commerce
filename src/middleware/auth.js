const jwt = require('jsonwebtoken');
const loginuser = require("../models/loginuser");


const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        // console.log(token);
        if (!token) {
            return res.status(403).redirect('/')
        }
        const verifyuser = jwt.verify(token, "secretkey");
        // console.log(verifyuser);
        const user = await loginuser.findOne({ _id: verifyuser._id });
        // console.log(user);
        req.token = token;
        req.user = user;        
        next()
    } catch (error) {
        res.status(401).json("Invalid Token")
    }
}

module.exports = verifyToken;