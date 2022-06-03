const mongoose = require('mongoose');
const product = require('./product');


const addtocartSchema = new mongoose.Schema({
    user_id: {
        type: 'ObjectId',
        default: null,
        ref: 'user'
    },
    products: [{
        product:{
            type: 'ObjectId',
            ref: 'product'
        },
        quantity:{
            type:Number,
            default:1
        }
    }],
    createdat: {
        type: Date,
        default: Date.now
    },
    updatedat: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('addtocart', addtocartSchema);