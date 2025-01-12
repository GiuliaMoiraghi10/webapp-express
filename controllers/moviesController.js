const connection = require('../data/db')

function index(req, res) {
    // funzione che mostrerà tutti i movies + media voti
    // restituisce un json

    let sql = `SELECT movies.*, AVG(vote) AS avg_vote
                FROM movies
                JOIN reviews
                ON movies.id = reviews.movie_id`

    // aggiunta filtro
    if (req.query.search) {
        sql += ` WHERE title LIKE '%${req.query.search}%' OR director LIKE '%${req.query.search}%' OR abstract LIKE '%${req.query.search}%'`
    }

    sql += ` GROUP BY movies.id`

    connection.query(sql, (err, movies) => {
        if (err) return res.status(500).json({ message: err.message }) // se il valore è null, restituisce errore

        movies.forEach((movie) => {
            movie.image = `http://localhost:3000/img/${movie.image}` //recupero le immagini dal DB
        })

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

    let sql = `SELECT movies.*, AVG(vote) AS avg_vote
                FROM movies
                JOIN reviews
                ON movies.id = reviews.movie_id
                WHERE movies.id = ?
                GROUP BY movies.id`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        if (results.length === 0) return res.status(404).json({
            error: 'Not Found',
            message: 'Movie not found',
        })

        // se non ci sono errori e se l'id cercato è > di 0 allora il primo elemento dell'array è l'id che stiamo cercando
        const movie = results[0]

        movie.image = `http://localhost:3000/img/${movie.image}` //recupero le immagini dal DB

        const sql = `SELECT * FROM reviews WHERE movie_id = ?` // cerco le recensioni per id movie

        connection.query(sql, [id], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })

            movie.reviews = results // mostro i reviews inerenti a id del movie

            res.json(movie) // mostro movie cercato tramite id e le sue relative reviews
        })
    })
}

module.exports = { index, show }