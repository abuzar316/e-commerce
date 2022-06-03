// const users = require('../models/user');
// const adminuser = require('../models/adminuser');
// const loginuser = require('../models/loginuser');
// const transporter = require('../configuration/emailTransport');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const emailsender = require('../utils/emailSender');

// module.exports.adminregisterController = async (req, res) => {
//     try {
//         //------------------------ all input------------------------
//         const { email, first_name, last_name, mobile, gender, password, cpassword, role_id, username } = req.body;
//         // --------------check if user already exist-----------
//         const oldUser = await adminuser.findOne({ email });
//         // console.log(oldUser);
//         if (oldUser) {
//             return res.status(400).send("User Already Exist. Please Login");
//         }
//         // ----------------check all input filled required-----------
//         if (!(email && first_name && last_name && mobile && gender && password && cpassword && username && role_id)) {
//             return res.status(400).json("All Input Filled Is required")
//         }
//         // --------------check password bath a same--------------
//         if (!(password === cpassword)) {
//             return res.status(400).json('Password Is Not Match')
//         }
//         //------------------------ mobile number validation using regex-----------------
//         const mobileValidation = /^[0-9]{10,12}$/;
//         const mobilevalcheck = mobileValidation.test(mobile)
//         if (!mobilevalcheck) {
//             return res.status(400).json("Mobile Number Invalid")
//         }
//         //---------------- email validation using regex--------------
//         const emailValidation = /^[a-z0-9._-]+@[a-z0-9.-]+.[a-z]+.[a-z0-9]{2,}$/;
//         const emailValcheck = emailValidation.test(email);
//         if (!emailValcheck) {
//             return res.status(400).json('Email Is Invalid')
//         }
//         //----------------------- password validation usinng regex----------------
//         const passwordValidate = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$\/\!#%*^?&])[a-zA-Z0-9\d@$\/\!#^%*?&]{8,}/;
//         const passwordvalcheck = passwordValidate.test(password);
//         if (!passwordvalcheck) {
//             return res.status(400).json('Please Enter Strong Password');
//         }
//         //---------------------------- bcrypt password--------------------
//         const bcryptpassword = await bcrypt.hash(password, 10);
//         // save data in database
//         let userData = new adminuser({
//             email,
//             first_name,
//             last_name,
//             mobile,
//             gender,
//             password: bcryptpassword,
//             username,
//             role_id
//         });
//         // genrate token
//         const confirmToken = jwt.sign({ id: userData._id }, "secretkey", { expiresIn: '10 minutes' });
//         // send email 
//         const mailoption = emailsender(email , first_name,last_name,confirmToken)
//         // console.log(mailoption);
//         await transporter.sendMail(mailoption)

//         const loginuserDB = new loginuser({
//             user_id: userData._id
//         });
//         await userData.save();
//         await loginuserDB.save();
//         // reponse
//         res.status(200).json("Register successfully check your email and verify your account")
//     } catch (error) {
//         console.log('catch error ' + error.message);
//         res.send(error)
//         // res.status(400).json({ error: error.message })
//     }
// }


// module.exports.adminlogin = async (req, res) => {
//     try {
//         const { user_email_number, password } = req.body;
//         const userDB = await adminuser.findOne({
//             $or: [
//                 { email: user_email_number },
//                 { mobile_no: user_email_number },
//                 { username: user_email_number }
//             ]
//         });
//         // console.log(userDB);
//         if (userDB == null) {
//             return res.status(400).json("Invalid Email");
//         }
//         const loginuserDB = await loginuser.findOne({ user_id: userDB._id });
//         if (req.cookies.jwtToken) {
//             return res.status(400).json("User Already Login")
//         }
//         //match password
//         const matchpassword = await bcrypt.compare(password, userDB.password);
//         // console.log(matchpassword);
//         // not match password run this code
//         if (!matchpassword) {
//             return res.status(400).json("passworrd is not match");
//         }
//         if (userDB.status == false) {
//             return res.status(400).json("Your email verification pending")
//         }
//         // generate token in login database
//         const token = jwt.sign({ _id: loginuserDB._id }, 'secretkey', { expiresIn: '24h' });
//         // loginuser.tokens = loginuser.tokens.concat({ token: token });
//         loginuserDB.tokens = [...loginuserDB.tokens, { token: token }];
//         await loginuserDB.save();
//         res.cookie('jwtToken', token)
//         //response
//         res.status(200).json("Welcome You are login");
//     } catch (error) {
//         console.log('catch error ' + error.message);
//         res.send(error)
//         // res.status(400).json({ error: error.message })
//     }
// }


