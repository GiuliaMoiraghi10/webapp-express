const connection = require('../data/db')

function index(req, res) {
    // funzione che mostrerà tutti i movies
    // restituisce un json
    res.json({
        message: 'Movies INDEX'
    })
}

function show(req, res) {
    // funzione che mostrerà dettaglio movie + review
    // restituisce json
    res.json({
        message: 'Movies SHOW'
    })
}

module.exports = { index, show }