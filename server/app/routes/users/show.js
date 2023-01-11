const router = require('express').Router();
const jwt = require('jsonwebtoken')

router.get('/api/v1/user/:token', async(req, res) => {
    if (!req.body) {
        return res.status(400).send({
            info: "filed cannot be empty"
        })
    } 

    if (!req.params.token) {
        return res.status(400).send({
            info: "You should provide an valid token"
        })
    }

    let userData = jwt.verify(req.params.token, 'secretkey');
    userData['name'] = userData.email.split('@')[0]
    return res.status(200).send(userData);

})

module.exports = router;