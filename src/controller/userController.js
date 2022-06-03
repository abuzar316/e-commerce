const users = require('../models/user');
const loginuser = require('../models/loginuser');
const transporter = require('../configuration/emailTransport');
const emailsender = require('../utils/emailSender');
const addtocartSchema = require('../models/addToCart');
const validation = require('../validation/validation');
const bcryptPassword = require('../utils/bcryptPassword');
const genrateToken = require('../utils/tokenGenrate');


module.exports.getregisterController = async (req, res) => {
    let data = { msg: '', addClass: 'alert-danger', user_info: req.logeddin };
    res.render('register', data);
}

module.exports.registerController = async (req, res) => {
    try {
        //------------------------ all input------------------------
        const { email, first_name, last_name, mobile, gender, password, cpassword, username } = req.body;
        // --------------check if user already exist-----------
        const oldUser = await users.findOne({ email });
        if (oldUser) {
            let data = { msg: "User Already Exist. Please Login", addClass: 'alert-danger', user_info: req.logeddin };
            return res.status(400).render('register', data);
        }
        // ----------------check all input filled required-----------
        if (!(email && first_name && last_name && mobile && gender && password && cpassword && username)) {
            let data = { msg: 'All Input Filled Is required', addClass: 'alert-danger', user_info: req.logeddin };
            return res.status(400).render('register', data)
        }
        // --------------check password bath a same--------------
        if (password !== cpassword) {
            let data = { msg: "Password Is Not Match", addClass: 'alert-danger', user_info: req.logeddin };
            return res.status(400).render('register', data)
        }
        //------------------------ mobile number validation using regex----------------- 
        if (!validation.mobile(mobile)) {
            let data = { msg: "Mobile Number Invalid", addClass: 'alert-danger', user_info: req.logeddin }
            return res.status(400).render('register', data)
        }
        //---------------- email validation using regex--------------
        if (!validation.email(email)) {
            let data = { msg: "Email Is Invalid", addClass: 'alert-danger', user_info: req.logeddin };
            return res.status(400).render('register', data);
        }
        //----------------------- password validation usinng regex----------------
        if (!validation.password(password)) {
            let data = { msg: "Please Enter Strong Password", addClass: 'alert-danger', user_info: req.logeddin };
            return res.status(400).render('register', data);
        }
        //---------------------------- bcrypt password--------------------
        // const bcryptPass = 
        // save data in database
        let userData = new users({
            email,
            first_name,
            last_name,
            mobile,
            gender,
            password: await bcryptPassword.hash(password),
            username,
        });
        // genrate token
        const confirmToken = genrateToken(userData._id, '10 minutes');
        // send email 
        const mailoption = emailsender(email, first_name, last_name, confirmToken)
        // console.log(mailoption);
        await transporter.sendMail(mailoption)

        const loginuserDB = new loginuser({
            user_id: userData._id
        });
        const cartData = addtocartSchema({
            user_id: userData._id
        })

        // save data
        await userData.save();
        await loginuserDB.save();
        await cartData.save();
        // reponse
        let data = { msg: "Register successfully check your email and verify your account", addClass: 'alert-success', user_info: req.logeddin };
        res.status(200).render('register', data);
    } catch (error) {
        let data = { msg: error.message, user_info: req.logeddin, addClass: 'alert-danger' }
        res.status(400).render('register', data);
    }
}

module.exports.loginController = async (req, res) => {
    try {
        const oldEmail = req.session.email == '' ? '' : req.session.email;

        const { email, password } = req.body;
        const userDB = await users.findOne({ email });
        // console.log(role);
        if (userDB == null) {
            let data = { msg: "Invalid Email", addClass: 'alert-danger', user_info: req.logeddin, oldEmail }
            return res.status(400).render('login', data)
        }
        const loginuserDB = await loginuser.findOne({ user_id: userDB._id });
        if (req.cookies.jwtToken) {
            let data = { msg: "User Already Login", addClass: 'alert-danger', user_info: req.logeddin, oldEmail }
            return res.status(400).render('login', data)
        }
        //match password
        // const matchpassword = await bcrypt.compare(password, userDB.password);
        const matchpassword = await bcryptPassword.compare(password, userDB.password)
        // console.log(matchpassword);
        // not match password run this code
        if (!matchpassword) {
            return res.status(400).render('login', { msg: "passworrd is not match", addClass: 'alert-danger', user_info: req.logeddin, oldEmail })
            // return res.status(400).json("passworrd is not match");
        }
        if (userDB.status == false) {
            return res.status(400).render('login', { msg: "Your email verification pending", addClass: 'alert-danger', user_info: req.logeddin, oldEmail })
        }
        // generate token in login database
        const token = genrateToken(loginuserDB._id, '24h');
        // loginuser.tokens = loginuser.tokens.concat({ token: token });
        loginuserDB.tokens = [...loginuserDB.tokens, { token: token }];
        await loginuserDB.save();
        res.cookie('jwtToken', token)
        //response
        if (userDB.role == 'admin') {
            req.session.email = email;
            return res.status(200).redirect('/dashboard');
        }
        req.session.email = email;
        res.status(200).redirect("/");
    } catch (error) {
        console.log('catch error ' + error.message);
        res.send(error)
        // res.status(400).json({ error: error.message })
    }
}

module.exports.getloginController = (req, res) => {
    // req.session.email = "sjklku"
    const oldEmail = req.session.email == '' ? '' : req.session.email;
    // console.log(oldEmail);
    // console.log(req.session);
    res.render('login', { msg: '', user_info: req.logeddin, oldEmail })
}

module.exports.logoutController = async (req, res) => {
    try {
        // console.log(req.user);
        req.user.tokens = req.user.tokens.filter((currElement) => {
            // console.log(currElement.token);
            return currElement.token != req.cookies.jwtToken
        })

        res.clearCookie('jwtToken')
        // console.log(req.user.tokens);
        await req.user.save();
        res.status(200).redirect('/')
        // res.status(200).json("Logout successfull")
    } catch (error) {
        console.log('catch error ' + error.message);
        res.send(error)
        // res.status(400).json({ error: error.message })
    }
}
