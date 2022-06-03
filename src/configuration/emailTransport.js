const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAILUSER, // generated ethereal user
        pass: process.env.EMAILPASSWORD, // generated ethereal password
    },
});


module.exports = transporter