// Dependencies
const nodemailer = require('nodemailer')
require("dotenv").config();   

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({

    host: 'smtp.gmail.com' ,
    port: 465,
    name: 'gmail.com',
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL,
    },
  });

  const message = {
    from: `${'Nodeflix Support'} <${'noreplynodeflix@gmail.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;