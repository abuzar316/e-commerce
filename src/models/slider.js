const mongoose = require('mongoose');


const slideSchema = new mongoose.Schema({
    slide_image: {
        type: String,
        required: true,
    },
    slide_heading: {
        type: String,
        required: true,
    },
    slide_subheading: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('slide', slideSchema);