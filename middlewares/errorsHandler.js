function errorsHandler(err, req, res) {
    res.status(500).json({
        message: err.message,
    })
}

module.exports = errorsHandler