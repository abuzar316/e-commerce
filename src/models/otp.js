const mongoose = require('mongoose');
const ip = require("ip");


const otpSchema = new mongoose.Schema({
    user_id:{
        type: 'ObjectId',
        required:true,
        ref:'user'
    },
    createdat: {
        type: Date,
        default: Date.now
    },
    ip:{
        type:String,
        default:ip.address()
    },
    otp:{
        type:Number,
        required:true
    },
    attempt:{
        type:Number,
        required:true,
        default:5
    },
    token:{
        type:String,
        required:true
    }
});


module.exports = mongoose.model('otp', otpSchema);