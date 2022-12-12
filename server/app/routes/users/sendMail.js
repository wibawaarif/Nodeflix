const sendEmail = require('../../utils/nodemailer')
const { randomString } = require('../../services/services')
const { body, validationResult } = require('express-validator');
const User = require('../../models/Users');
const router = require('express').Router();
const bcrypt = require('bcryptjs');

router.post('/api/v1/sendemail',
[
  body('email').isEmail().withMessage('Email must be valid'),
],
async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ info: "Email cannot be empty" });
  }

  const existingEmail = await User.findOne({ email: email })
  if (existingEmail) {
    return res.status(400).json({ info: "Email has already registered!" });
  }

  const generatePassword = randomString(20);
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(generatePassword, salt);

  try {
    await sendEmail({
      email: email,
      subject: 'Welcome to Nodeflix!',
      html: `<p>Welcome to Nodeflix <b>${email.substring(0, email.indexOf("@"))}</b>!<br><br>
      Your email has successfully been registered. The following data is required for your future login :<br><br>
      Email : ${email}<br>
      Password : ${generatePassword}<br><br>
      Have a wonderful day,<br>
      - Arif W.</p>`,
    });

    const user = new User({
      email: email,
      password: hashedPassword
    })

    await user.save();
  
    res.status(200).json({ success: true, data: 'Email sent to : '+req.body.name+' (email) : ' +req.body.email });
  } catch (err) {
      console.error(err);
      return res.status(400).send({
        info: "Email not sent"
      })
  }
}
)

module.exports = router;


