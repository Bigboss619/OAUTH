const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const connectDB = require('./config/db');
const keys = require('./config/keys');
const session = require('express-session');
const passport = require('passport');

const app = express();

connectDB();

// set up view engine
app.set('view engine', 'ejs');

app.use(session({
  secret: keys.session.cookieKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});