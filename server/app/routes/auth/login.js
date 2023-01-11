const User = require('../../models/Users');
const { body, validationResult } = require('express-validator');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.post('/api/v1/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),
  ], 
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const findUser = await User.findOne({email})

  if (!findUser) {
    return res.status(404).send({
      info: "Email not found"
    })
  }

  const verified = bcrypt.compareSync(password, findUser.password);
  if (!verified) {
    return res.status(403).send({
      info: 'Invalid credentials'
    })
  }

  let token = jwt.sign({userId: findUser._id, email: findUser.email}, 'secretkey')
  return res.status(200).send({
    title: 'login success',
    MqmK0vCX0rJWbwzrV8bT5hGCpH8O5R8Sr93a: token,
  })
});


module.exports = router;