const express = require('express');
const bodyParser = require('body-parser')
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

const UserLogin = require('./routes/users/login')
const UserRegister = require('./routes/users/register')
const sendEmail = require('./routes/users/sendMail')

require('dotenv').config();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};
function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log('access token', accessToken)
  console.log('refreshToken', refreshToken)
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((id, done) => {
  // User.findById(id).then(user => {
  //   done(null, user);
  // });
  done(null, id);
});

const path = __dirname + '/views/' 
const app = express();
app.use(mongoSanitize());
app.use(cors())
app.use(express.static(path))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use('/', UserLogin);
app.use('/', UserRegister)
app.use('/', sendEmail)

app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [ config.COOKIE_KEY_1, config.COOKIE_KEY_2 ],
}));
app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) { 
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: 'You must log in!',
    });
  }
  next();
}


app.get('/auth/google', 
  passport.authenticate('google', {
    scope: ['email'],
  }));

app.get('/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: 'http://localhost:8080/login',
    session: true,
  }), 
  (req, res) => {
    console.log('Called Back!');
  }
);

app.get('/auth/logout', (req, res) => {
  req.logout(); //Removes req.user and clears any logged in session
  return res.redirect('/');
});

app.get('/secret', checkLoggedIn, (req, res) => {
  return res.send('Your personal secret value is 42!');
});

app.get('/failure', (req, res) => {
  return res.send('Failed to log in!');
});


app.get('/*', (req, res) => {
  res.sendFile(path + "index.html")
})


module.exports = app