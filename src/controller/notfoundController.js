

module.exports.notFoundController = (req, res) => {
    res.status(404).render('errorpage')
}