const express = require('express');
const session = require('express-session');
const passport = require('passport')
const googleStrategy = require('passport-google-oauth20')
const cookieParser = require('cookie-parser');

require('dotenv').config();
const configViewEngine = require('./config/ViewEngine');
const webRouters = require('./routes/web');
const apiRoutes = require('./routes/api')
const bodyParser = require('body-parser');
const path = require('path');
const Account = require('./models/AccountModel')

const app = express();
const port = process.env.PORT || 9000;
const hostname = process.env.HOST_NAME || 'localhost'

// Config view engine
configViewEngine(app);
//cookie
app.use(cookieParser()); 
//config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// Routes
app.use(session({
  secret: process.env.SERVER_SECRET_KEY,
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
  const email = profile.emails[0].value;

  Account.findByEmail(email, (err, existingUser) => {
    if (err) return done(err);

    if (!existingUser) {
  const newUser = {
  email: email,
  password: '',
  role: 'customer'
};

     Account.create(newUser, (err, createdUser) => {
  if (err) return done(err);
  done(null, createdUser); 
});
    } else {
      done(null, existingUser);
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id); 
});
passport.deserializeUser((id, done) => {
  Account.findById(id, (err, user) => {
    if (err) return done(err);
    done(null, user); 
  });
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: "/login" }), (req, res) => {
  res.redirect('/HomePage')
});
app.get("/logout", (req, res, next) => {
  req.logOut(function(err) {
    if (err) { return next(err); }
    res.redirect("/homepage");
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'src/public/images')));

app.use('/', webRouters);
app.use('/api',apiRoutes)


app.listen(port, hostname, () => {
  console.log(`Server is running on port ${port}`)
})