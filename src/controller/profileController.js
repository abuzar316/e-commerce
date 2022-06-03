const user = require('../models/user');
const bcrypt = require('bcrypt');
const loginuser = require('../models/loginuser');
const fs = require('fs');
const path = require('path')

module.exports.getadminProfile = async (req, res) => {
    try {
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
        const userid = req.user.user_id;
        const userDB = await user.findOne({ _id: userid });
        // console.log(loginuserDB);

        res.status(200).render('dashboard/dashboard-profile', { userDB, msg: '', addClass: '', profile_pic });
    } catch (error) {
        console.log(error);
    }
}

module.exports.updateadminProfile = async (req, res) => {
    try {
        const { username, mobile, last_name, first_name, email, gender, } = req.body;
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
        const userid = req.user.user_id;
        // const userDB = await user.findOne({ _id: userid });
        const updateUser = await user.findByIdAndUpdate(userid, {
            username, mobile, last_name, first_name, email, gender,
        })
        // console.log(updateUser);
        res.status(200).render('dashboard/dashboard-profile', { userDB: updateUser, msg: 'user update successfully', addClass: 'alert-success', profile_pic });
    } catch (error) {
        console.log(error);
    }
}

module.exports.getChangepass = async (req, res) => {
    try {
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
        res.status(200).render('dashboard/dashboard-changepassword', { msg: '', profile_pic })
    } catch (error) {
        console.log(error);
    }
}

module.exports.postChangepass = async (req, res) => {
    try {
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
        // find login user
        const userID = req.user.user_id.toString();
        const userDB = await user.findById({ _id: userID });
        // all input from user
        const { oldPassword, newPassword, newCPassword } = req.body
        const matchPassword = await bcrypt.compare(oldPassword, userDB.password);
        // console.log(matchPassword);
        if (!matchPassword) {
            return res.status(400).render('dashboard/dashboard-changepassword', { msg: 'Old password is not match', addClass: 'alert-danger', profile_pic })
        }
        if (!(newPassword === newCPassword)) {
            return res.status(400).render('dashboard/dashboard-changepassword', { msg: 'new password new confirm password not match', addClass: 'alert-danger', profile_pic })
        }
        const bcryptpassword = await bcrypt.hash(newPassword, 10);
        // console.log(bcryptpassword);
        const updatePassword = await user.updateOne({ _id: userDB._id }, { $set: { password: bcryptpassword } });
        // console.log(updatePassword);

        res.status(200).render('dashboard/dashboard-changepassword', { msg: 'password change successfully', addClass: 'alert-success', profile_pic })
    } catch (error) {
        console.log(error);
    }
}

module.exports.getProfilepic = async (req, res) => {
    try {
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
        // console.log(userDB.profile_pic);
        res.status(200).render('dashboard/dashboard-profilepic', { msg: '', profile_pic })
    } catch (error) {
        console.log(error);
    }
}

module.exports.postProfilepic = async (req, res) => {
    try {
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
        // console.log(req.file);
        const id = req.user._id
        if (req.file) {
            new_image = req.file.filename;
            const filepath = path.join(__dirname, '../public/images/', req.body.old_profile)
            try {
                fs.unlinkSync(filepath);
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_profile;
        }

        const updateprofile = await loginuser.findByIdAndUpdate(id, {
            profile_pic: new_image
        })
        // console.log(updateprofile);

        res.status(200).render('dashboard/dashboard-profilepic', { msg: 'profile update successfully', profile_pic, addClass: 'alert-success' })
    } catch (error) {
        console.log(error);
    }
}

module.exports.getwebsetting = async (req, res) => {
    try {
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
        res.status(200).render('dashboard/dashboard-settings', { msg: 'profile update successfully', profile_pic, addClass: 'alert-success' })
    } catch (error) {
        console.log(error);
    }
}

module.exports.getalluser = async (req, res) => {
    try {
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
        const allUser = await user.find();
        res.status(200).render('dashboard/dashboard-alluser', { allUser, msg: 'profile update successfully', profile_pic, addClass: 'alert-success' })
    } catch (error) {
        console.log(error);
    }
}

module.exports.getupdateuser = async (req, res) => {
    try {
        const id = req.params.id;
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';

        const userDB = await user.findOne({_id:id});
        // console.log(userDB);

        res.status(200).render('dashboard/dashboard-update-user', {userDB,  msg: 'profile update successfully', profile_pic, addClass: 'alert-success' })
    } catch (error) {
        console.log(error);
    }
}

module.exports.getdeleteuser = async (req, res) => {
    try {
        const id = req.params.id;
        const userDelete = await user.deleteOne({_id:id});
        // console.log(userDelete);
        res.status(200).redirect('/dashboard/alluser')
    } catch (error) {
        console.log(error);
    }
}