const mongoose = require('mongoose');


const permissionSchema = new mongoose.Schema({
    permission_name: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('permission', permissionSchema);