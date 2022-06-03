const jwt = require('jsonwebtoken');


module.exports = (_id, expiresIn) => {
    const token = jwt.sign({ _id }, process.env.TOKENKEY, { expiresIn: expiresIn });
    return token;
}