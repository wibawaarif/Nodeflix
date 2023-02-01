const router = require('express').Router();
const jwt = require('jsonwebtoken')

router.post('/api/v1/movies', async(req, res) => {
    const { title, url } = req.body

    if (!req.body) {
        return res.status(400).send({
            info: "Can't send empty field"
        })
    }

    let userData = jwt.verify(req.params.token, 'secretkey');
    userData['name'] = userData.email.split('@')[0]
    return res.status(200).send(userData);

})

module.exports = router;