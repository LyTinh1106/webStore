const express = require('express');
const session = require('express-session');
const passport = require('passport')
const googleStrategy = require('passport-google-oauth20')
require('dotenv').config();
const configViewEngine = require('./config/ViewEngine');
const webRouters = require('./routes/web');
const connection = require('./config/database');

const app = express();
const port = process.env.PORT || 9000;
const hostname = process.env.HOST_NAME || 'localhost'

// Config view engine
configViewEngine(app);
//config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// Routes
app.use(session({
  secret: 'topSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "http://localhost:9000/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: "/login" }), (req, res) => {
  res.redirect('/profile')
});

app.get("/profile", (req, res) => {
  res.send(`name: ${req.user.displayName}`)
});




app.use('/', webRouters);

app.listen(port, hostname, () => {
  console.log(`Server is running on port ${port}`)
})