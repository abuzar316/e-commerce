const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdby: {
        type: String,
        default: null,
    },
    createdat: {
        type: Date,
        default: Date.now
    },
    updatedby: {
        type: 'ObjectId',
        default: null,
        ref: 'user'
    },
    updatedat: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    },
});


module.exports = mongoose.model('product', productSchema);