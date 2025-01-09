function errorsHandler(err, _, res, _) { // deve avere 4 parametri per forza (anche req e next anche se non si usano)
    res.status(500).json({
        message: err.message,
    })
}

module.exports = errorsHandler