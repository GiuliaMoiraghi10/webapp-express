// console.log('webapp - backend')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const notFound = require('./middlewares/notFound')
const errorsHandler = require('./middlewares/errorsHandler')
const cors = require('cors')

const moviesRouter = require('./routers/moviesRouter')

// console.log(process.env)

// registro cors per ricevere chiamate al server da URL diverso
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))

//body parser x leggere proprietà nel body da postman
app.use(express.json())

// rendo visibile cartella public (con dentro img)
app.use(express.static('public'))


// creo rotta /
app.get('/', (req, res) => {
    res.send('Server is running')
})

// registro rotta movies '/api/movies'
app.use('/api/movies', moviesRouter)


// Middlewares --> DOPO rotta!
app.use(errorsHandler)
app.use(notFound)


// metto in ascolto la porta
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})