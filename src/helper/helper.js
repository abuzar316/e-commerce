const bcrypt = require('bcrypt');

module.exports.comparePassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword)
}