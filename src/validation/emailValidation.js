module.exports = (email) => {
    const emailValidation = /^[a-z0-9._-]+@[a-z0-9.-]+.[a-z]+.[a-z0-9]{2,}$/;
    const emailValcheck = emailValidation.test(email);
    return emailValcheck;
}