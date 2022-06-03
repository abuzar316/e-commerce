const slideSchema = require('../models/slider');
const fs = require('fs');
const path = require('path');

module.exports.allslide = async (req, res) => {
    try {
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';

        const allslideDB = await slideSchema.find();
        // console.log(allslideDB);
        res.render('dashboard/dashboard-allslider', { allslideDB, profile_pic })
    } catch (error) {
        console.log(error);
    }
}

module.exports.updateslide = async (req, res) => {
    try {
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';

        const id = req.params.id;
        const slideDB = await slideSchema.findOne({ _id: id });
        // console.log(slideDB);
        res.status(200).render('dashboard/dashboard-updateslider', { slideDB, msg: '', profile_pic })
        // res.json("hello")
    } catch (error) {
        console.log(error);
    }
}

module.exports.postupdateslide = async (req, res) => {
    try {
        const { slide_subheading, slide_heading } = req.body

        // console.log(req.body);
        let id = req.params.id;
        const sliderDB = await slideSchema.findOne({ _id: id });
        let new_image = '';
        const filepath = path.join(__dirname, '../public/images/', sliderDB.slide_image)
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

        const data = await slideSchema.findByIdAndUpdate(id, {
            slide_subheading, slide_heading, slide_image: new_image
        })
        // console.log(data);
        res.redirect("/dashboard/all-slide")
    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteslide = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const sliderDB = await slideSchema.findOne({ _id: id });
        const deleteProduct = await slideSchema.deleteOne({ _id: id });
        // console.log(sliderDB);
        const filepath = path.join(__dirname, '../public/images/', sliderDB.slide_image)
        fs.unlinkSync(filepath);
        // console.log(filepath);
        // console.log(deleteProduct);
        res.redirect("/dashboard/all-slide")
    } catch (error) {
        console.log(error);
    }
}

module.exports.getslide = async (req, res) => {
    try {
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
        res.render('dashboard/dashboard-addslider', { msg: '', addClass: '', profile_pic })
    } catch (error) {
        console.log(error);
    }
}

module.exports.addslide = async (req, res) => {
    try {
        const profile_pic = req.user.profile_pic ? req.user.profile_pic : 'user-pic.jpg';
        const { slide_subheading, slide_heading } = req.body
        if (!(slide_subheading && slide_heading && req.file.filename)) {
            return res.status(400).render('dashboard/dashboard-addslider', { msg: "All Fields requred", addClass: 'alert-danger', profile_pic })
        }
        const addSlide = slideSchema({
            slide_subheading, slide_heading, slide_image: req.file.filename,
        })
        await addSlide.save();
        res.render('dashboard/dashboard-addslider', { msg: "Add slider successfully", addClass: 'alert-success', profile_pic })
    } catch (error) {
        console.log(error);
    }
}