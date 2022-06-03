const user = require('../models/user');
const addressSchema = require('../models/address');


module.exports.getUserDashboard = async (req, res) => {
    try {
        const userDB = await user.findOne({_id:req.user.user_id})
        // console.log(userDB);
        res.status(200).render('user/dashboard', { user_info: req.logeddin , username:userDB.username })
    } catch (error) {
        console.log(error);
    }
}

module.exports.getUserDetails = async (req, res) => {
    try {
        const userDB = await user.findOne({ _id: req.user.user_id })
        res.status(200).render('user/user-details', { user_info: req.logeddin, userDB, msg: "", addClass: '' })
    } catch (error) {
        console.log(error);
    }
}

module.exports.postUserDetails = async (req, res) => {
    try {
        const { email, first_name, last_name, mobile, username } = req.body;
        const userDB = await user.findOne({ _id: req.user.user_id })
        if (!(email && first_name && last_name && mobile && username)) {
            return res.status(400).render('user/user-details', { user_info: req.logeddin, userDB, msg: "All field is required", addClass: 'alert-danger' })
        }
        const updateuser = await userDB.updateOne({ email, first_name, last_name, mobile, username });
        // console.log(updateuser);
        res.status(200).render('user/user-details', { user_info: req.logeddin, userDB, msg: "Update successfully", addClass: 'alert-success' })
    } catch (error) {
        console.log(error);
    }
}

module.exports.getUserAddress = async (req, res) => {
    try {
        const alladdress = await addressSchema.find({ userid: req.user.user_id });
        res.status(200).render('user/user-address', { user_info: req.logeddin, alladdress });
    } catch (error) {
        console.log(error);
    }
}

module.exports.getAddressDelete = async (req, res) => {
    try {
        const id = req.params.id
        const deleteAddress = await addressSchema.deleteOne({ _id: id })
        res.status(200).redirect('/user-address')
    } catch (error) {
        console.log(error);
    }
}

module.exports.getUserAddressAdd = async (req, res) => {
    try {
        res.status(200).render('user/user-address-add', { user_info: req.logeddin, msg: "", addClass: '' })
    } catch (error) {
        console.log(error);
    }
}

module.exports.postUserAddressAdd = async (req, res) => {
    try {
        const { alias, fname, lname, mobile, address, city, state, postalcode } = req.body;
        if (!(fname && lname && mobile && address && city && state && postalcode)) {
            return res.status(400).render('user/user-address-add', { user_info: req.logeddin, msg: "All field is required", addClass: 'alert-danger' })
        }
        const addressSave = addressSchema({
            alias, fname, lname, mobile, address, city, state, postalcode, userid: req.user.user_id
        })
        await addressSave.save();
        res.status(200).redirect('user-address')
        // res.status(200).render('user/user-address-add', { user_info: req.logeddin, msg: "add successfully", addClass: 'alert-success' })
    } catch (error) {
        res.status(400).render('user/user-address-add', { user_info: req.logeddin, msg: error, addClass: 'alert-success' })
        // console.log(error);
    }
}

module.exports.getAddressupdate = async (req, res) => {
    try {
        const id = req.params.id;
        const AddressDB = await addressSchema.findOne({ _id: id });
        res.status(200).render('user/user-address-update', { user_info: req.logeddin, AddressDB, msg: "", addClass: 'alert-success' })
    } catch (error) {
        res.status(400).render('user/user-address-add', { user_info: req.logeddin, msg: error, addClass: 'alert-danger' })
        // console.log(error);
    }
}

module.exports.postAddressupdate = async (req, res) => {
    try {
        const id = req.params.id;
        const AddressDB = await addressSchema.findOne({ _id: id });
        const { alias, fname, lname, mobile, address, city, postalcode } = req.body;
        const state = req.body.state || req.body.oldState;
        console.log(state);
        if (!(fname && lname && mobile && address && city && state && postalcode)) {
            return res.status(400).render('user/user-address-update', { user_info: req.logeddin, AddressDB, msg: "All field is required", addClass: 'alert-danger' })
        }
        const updateAddress = await AddressDB.updateOne({ alias, fname, lname, mobile, address, city, state, postalcode });
        res.status(200).redirect('/user-address')
        // res.status(200).render('user/user-address-update', { user_info: req.logeddin, AddressDB, msg: "", addClass: 'alert-success' })
    } catch (error) {
        res.status(400).render('user/user-address-add', { user_info: req.logeddin, msg: error, addClass: 'alert-danger' })
        // console.log(error);
    }
}