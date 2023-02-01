const router = require('express').Router();
const jwt = require('jsonwebtoken')
const Movies = require('../../models/Movies')

router.get('/api/v1/movies', async(req, res) => {
    const getAllMovies = await Movies.find({}).sort({createdAt: -1})

    if (!getAllMovies) {
        return res.status(400).send({
            info: "Data empty"
        })
    }

    return res.status(200).send(getAllMovies);

})

module.exports = router;