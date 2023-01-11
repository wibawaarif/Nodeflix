const User = require('../../models/Users');
const { body, validationResult } = require('express-validator');
const router = require('express').Router();
const bcrypt = require('bcryptjs');


router.post('/api/v1/register', 
  [
    body('email').isEmail().withMessage('Email must be valid'),
  ],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { email, password } = req.body;
  
  if (!password) {
    return res.status(400).json({ info: "Password cannot be empty" });
  }

  const existingEmail = await User.findOne({ email: email })
  if (existingEmail) {
    return res.status(400).json({ info: "Email has already registered!" });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = new User({
    email,
    password: hashedPassword
  });
  await user.save();

  return res.status(200).send({
    info: `Email: ${email} has created! Please login...`
  })

});


module.exports = router;