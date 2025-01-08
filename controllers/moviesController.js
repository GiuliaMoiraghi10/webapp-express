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
    const id = parseInt(req.params.id) // recupero parametro

    if (isNaN(id)) // se l'id è NaN, esce errore perchè non trova niente
        return res.status(404).json({
            error: 'Not Found',
            message: 'Movie not found'
        })

    const sql = `SELECT * FROM movies WHERE id = ?`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        if (results.length === 0) return res.status(404).json({
            error: 'Not Found',
            message: 'Movie not found',
        })

        // se non ci sono errori e se l'id cercato è > di 0 allora il primo elemento dell'array è l'id che stiamo cercando
        const movie = results[0]

        const sql = `SELECT * FROM reviews WHERE movie_id = ?` // cerco le recensioni per id movie

        connection.query(sql, [id], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })

            movie.reviews = results // mostro i reviews inerenti a id del movie

            res.json(movie) // mostro movie cercato tramite id e le sue relative reviews
        })
    })
}

module.exports = { index, show }