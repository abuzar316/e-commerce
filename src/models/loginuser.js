const mongoose = require('mongoose');
const ip = require("ip");


const loginSchema = new mongoose.Schema({
    user_id: {
        type: 'ObjectId',
        required: true,
        ref: 'user'
    },
    tokens: [{
        token: {
            type: String
        },
        createdat: {
            type: Date,
            default: Date.now
        },
        ip: {
            type: String,
            default: ip.address()
        }
    }],
    profile_pic: {
        type: String
    },
    forgettoken: {
        type: String,
        default: null
    },
    createdat: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('login', loginSchema);