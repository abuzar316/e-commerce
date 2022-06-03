const productSchema = require('../models/product');
const userSchema = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.getaddProduct = async (req, res) => {
    const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
    res.render('dashboard/dashboard-addpost', { msg: '', addClass: '', profile_pic })
}

module.exports.product = async (req, res) => {
    try {
        const { title, category, price, description } = req.body;
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';

        // const user = req.user.user_id;
        const userDB = await userSchema.findOne({ _id: req.user.user_id })
        // console.log("File",req.file.filename);
        if (!(title && category && price && description && req.file.filename)) {
            return res.status(400).render('dashboard/dashboard-addpost', { msg: "All Fields requred", addClass: 'alert-danger', profile_pic })
        }
        const proData = new productSchema({
            title, category, price, description, image: req.file.filename, createdby: userDB.username
        });
        // console.log(proData);
        const svaeData = await proData.save();
        res.status(200).render('dashboard/dashboard-addpost', { msg: "Add Post  successfully", addClass: 'alert-success', profile_pic })
    } catch (error) {
        return res.status(400).render('dashboard/dashboard-addpost', { msg: error.message, addClass: 'alert-danger', profile_pic })
    }
}

module.exports.editproduct = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const { title, category, price, description } = req.body;
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
        // console.log(req.body);
        // console.log("File",req.file.filename);

        // if (!(title && category && price && description && req.file.filename)) {
        //     return res.status(400).render('dashboard-addpost', { msg: "All Fields requred", addClass: 'alert-danger' })
        // }
        // const proData = new productSchema({
        //     title, category, price, description , image:req.file.filename
        // });
        // console.log(proData);
        // // const svaeData = await proData.save();
        // res.status(200).render('dashboard-addpost', { msg: "Add Post  successfully", addClass: 'alert-success' })
    } catch (error) {
        return res.status(400).render('dashboard-addpost', { msg: error.message, addClass: 'alert-danger', profile_pic })
    }
}

module.exports.geteditproduct = async (req, res) => {
    try {
        const id = req.params.id;
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
        const productDB = await productSchema.findOne({ _id: id });
        res.render('dashboard/dashboard-editpost', { msg: '', addClass: '', productDB, profile_pic })
    } catch (error) {
        console.log(error);
    }
}

module.exports.posteditproduct = async (req, res) => {
    try {
        const { title, category, price, description } = req.body;
        // console.log(req.body);
        let id = req.params.id;
        let new_image = '';
        const filepath = path.join(__dirname, '../public/images/', req.body.old_image)
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync(filepath);
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }

        const data = await productSchema.findByIdAndUpdate(id, {
            title, category, price, description, image: new_image
        })
        // console.log(data);
        res.redirect("/dashboard")
        // res.json("jhsh")
    } catch (error) {
        console.log(error);
    }
}


module.exports.getallproduct = async (req, res) => {
    const allproduct = await productSchema.find().sort({ '_id': '1' });
    const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
    // console.log(allproduct);
    let limitval = [1, 2, 5, 10, 15, 20];
    res.render('dashboard/dashboard-allpost', { allproduct, limitval, profile_pic })
}

module.exports.postallproduct = async (req, res) => {
    const datalimit = req.body.limit
    const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
    // console.log(req.body.userid);
    let limitval = [1, 2, 5, 10, 15, 20];
    const deleteData = await productSchema.deleteMany({ _id: { $in: req.body.userid } })
    const allproduct = await productSchema.find().limit(datalimit);
    // console.log(deleteData);
    // console.log(allproduct[3].createdby);
    res.render('dashboard/dashboard-allpost', { allproduct, limitval, datalimit, profile_pic })
}

module.exports.deleteproduct = async (req, res) => {
    try {
        const id = req.params.id;
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';

        // console.log(id);
        const productDB = await productSchema.findOne({ _id: id })
        // console.log(productDB);
        const deleteProduct = await productSchema.deleteOne({ _id: id });
        const filepath = path.join(__dirname, '../public/images/', productDB.image)
        fs.unlinkSync(filepath);
        // console.log(filepath);
        console.log("hello");
        // const allproduct = await productSchema.find();
        // console.log(allproduct);
        // res.render('dashboard-allpost', { allproduct })
        // res.json("delete")
        res.redirect('/dashboard/allpost')
    } catch (error) {
        console.log(error);
    }
}

module.exports.searchproduct = async (req, res) => {
    try {
        // console.log(req.query);
        
        const fil = req.query
        console.log(fil);

        console.log("hell l");
        const data = await productSchema.find();
        const filterdata = data.filter((user) => {
            let fildata
            // console.log(fildata);
            for (key in fil) {
                // console.log(key, user[key], fil[key]);
                fildata = user[key] == fil[key]
            }
            return fildata
        })
        res.json(filterdata)
        // console.log(filterdata);
    } catch (error) {
        console.log(error);
    }
}

module.exports.pageproduct = async (req, res) => {
    try {
        const { limit: limitVal } = req.query || 5;
        // console.log(limitVal);
        const data = await productSchema.find().limit(limitVal)
        // console.log(data);

        res.json(data)
        // console.log(filterdata);
    } catch (error) {
        console.log(error);
    }
}

module.exports.getProduct = async (req, res) => {
    try {
        const DBdata = await productSchema.find();
        res.status(200).json(DBdata)
        // console.log(DBdata);
    } catch (error) {
        res.status(400).json({ "status": "400", " msg": "error", error })
    }
}