const jwt = require('jsonwebtoken');
const users = require('../models/user');
const transpoter = require('../configuration/emailTransport');
const emailSender = require('../utils/emailSender');
const bcrypt = require('bcrypt')
const loginuser = require('../models/loginuser');


module.exports.getForgetpass = async (req, res) => {
    try {
        console.log("heleih");
        res.status(200).render('forgetpassword', { user_info: req.logeddin, msg: '' })
    } catch (err) {
        // console.log(err);
        res.status(400).json(err);
    }
}

module.exports.postForgetpass = async (req, res) => {
    try {
        const userDB = await users.findOne({ email: req.body.email });
        if (!req.body.email) return res.status(400).render('forgetpassword', { user_info: req.logeddin, msg: 'User not valid', addClass: 'alert-danger' })
        const loginuserDB = await loginuser.findOne({user_id:userDB._id});
        // console.log(loginuserDB);
        if (!userDB) return res.status(400).render('forgetpassword', { user_info: req.logeddin, msg: 'User not valid', addClass: 'alert-danger' })

        // console.log(userDB);
        const token = jwt.sign({ id: userDB._id }, process.env.KEY , { expiresIn: '10 minutes' });
        loginuserDB.forgettoken = token;
        const mailoption = emailSender(userDB.email, userDB.first_name, userDB.last_name, token)
        await transpoter.sendMail(mailoption);
        await loginuserDB.save();
        res.status(200).render('forgetpassword', { user_info: req.logeddin, msg: 'email send successfully', addClass: 'alert-success' })
    } catch (err) {
        // console.log(err);
        res.status(400).json(err);
    }
}

module.exports.getforgetemail = async (req, res) => {
    try {
        const token = req.params.token;
        // console.log(token);
        const verifyuser = jwt.verify(token, "secretkey");
        // console.log(verifyuser);
        const userDB = await users.findOne({ _id: verifyuser.id });
        const loginuserDB = await loginuser.findOne({user_id:userDB._id});

        // console.log(loginuserDB );
        if(!loginuserDB.forgettoken){
            return res.status(400).render('forgetemail', { user_info: req.logeddin, msg: 'invalid click', addClass: 'alert-danger' })
        }
        // console.log(userDB);
        if (!userDB) {
            return res.status(400).render('forgetemail', { user_info: req.logeddin, msg: 'user not valid', addClass: 'alert-danger' })
        }

        // console.log(userDB.status)
        res.status(200).render('forgetemail', { user_info: req.logeddin, msg: '', addClass: 'alert-success' })
    } catch (err) {
        // console.log(err);
        res.status(400).json(err);
    }
}

module.exports.postforgetemail = async (req, res) => {
    try {
        const token = req.params.token;
        const { newpassword, newcpassword } = req.body;
        const verifyuser = jwt.verify(token, "secretkey");
        // console.log(verifyuser);
        const userDB = await users.findOne({ _id: verifyuser.id });
        const loginuserDB = await loginuser.findOne({user_id:userDB._id});

        // console.log(loginuserDB );
        if(!loginuserDB.forgettoken){
            return res.status(400).render('forgetemail', { user_info: req.logeddin, msg: 'Invalid click', addClass: 'alert-danger' })
        }
        if (!userDB) {
            return res.status(400).render('forgetemail', { user_info: req.logeddin, msg: 'user not valid', addClass: 'alert-danger' })
        }
        if (newpassword != newcpassword) {
            return res.status(400).render('forgetemail', { user_info: req.logeddin, msg: 'new password and new confirm password not Match', addClass: 'alert-danger' })
        }

        //----------------------- password validation usinng regex----------------
        const passwordValidate = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$\/\!#%*^?&])[a-zA-Z0-9\d@$\/\!#^%*?&]{8,}/;
        const passwordvalcheck = passwordValidate.test(newpassword);
        if (!passwordvalcheck) {
            return res.status(400).render('forgetemail', { user_info: req.logeddin, msg: 'enter your strong password', addClass: 'alert-danger' })
        }

        const bcryptPassword = await bcrypt.hash(newpassword, 10)
        userDB.password = bcryptPassword;
        loginuserDB.forgettoken = null;
        await loginuserDB.save();
        await userDB.save();
        res.status(200).render('forgetemail', { user_info: req.logeddin, msg: 'Password change successfully', addClass: 'alert-success' })
    } catch (err) {
        // console.log(err);
        res.status(400).json(err);
    }
}