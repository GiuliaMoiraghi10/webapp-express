const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesController')

// registro rotta index
router.get('/', moviesController.index)

// registro rotta show
router.get('/:id', moviesController.show)

module.exports = router