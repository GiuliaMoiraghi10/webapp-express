const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesController')

// registro rotta index
router.get('/', moviesController.index)

// registro rotta show
router.get('/:id', moviesController.show)

// registro rotta store x nuova recensione: /api/movies/:id/reviews
router.post('/:id/reviews', moviesController.storeReview)

module.exports = router