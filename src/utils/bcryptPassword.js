const bcrypt = require('bcrypt');

module.exports.hash = async (password) => {
    const bcryptpassword = await bcrypt.hash(password, 10);
    return bcryptpassword;
}

module.exports.compare = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
}