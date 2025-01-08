const connection = require('../data/db')

function index(req, res) {
    // funzione che mostrerà tutti i movies
    // restituisce un json
    const sql = `SELECT * FROM movies`

    connection.query(sql, (err, movies) => {
        if (err) return res.status(500).json({ message: err.message }) // se il valore è null, restituisce errore

        res.json(movies) // altrimenti restituisce json con i movies
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