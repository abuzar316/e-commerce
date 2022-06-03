const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    userid:{
        type:'ObjectId',
    },
    alias: {
        type: String,
        default:'home',
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        default: null,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalcode: {
        type: Number,
        required: true
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
});


module.exports = mongoose.model('address', addressSchema);