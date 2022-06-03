const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    role:{
        type: String,
        required:true,
        default:'user'
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    first_name: {
        require: true,
        type: String,
        minlength: 3,
    },
    last_name: {
        require: true,
        type: String,
        minlength: 3
    },
    mobile: {
        require: true,
        type: String,
        unique: true,
        minlength: 10,
        maxlength: 12
    },
    gender: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String,
    },
    status:{
        type:Boolean,
        default: false,
    },
    createdat: {
        type: Date,
        default: Date.now
    },
    createdby: {
        type: String,
        default: null
    },
    updatedat: {
        type: Date,
        default: null
    },
    updatedby: {
        type: String,
        default: null
    },
})

module.exports = mongoose.model('user', userSchema);