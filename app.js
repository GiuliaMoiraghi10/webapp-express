// console.log('webapp - backend')

const express = require('express')
const app = express()
const port = 3000

const notFound = require('./middlewares/notFound')
const errorsHandler = require('./middlewares/errorsHandler')

// rendo visibile cartella public (con dentro img)
app.use(express.static('public'))


// creo rotta /
app.get('/', (req, res) => {
    res.send('Server is running')
})


// Middlewares --> DOPO rotta!
app.use(errorsHandler)
app.use(notFound)


// metto in ascolto la porta
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})