const express = require('express');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'ffkafakfkfhkwehfksfkafskfsflkflfsalfalffsfaflfalsdf',
  baseURL: 'http://localhost:3000',
  clientID: 'OrASP6N2RBQHcuSk078LFTT2iGkAwhjl',
  issuerBaseURL: 'https://salem-authentication.us.auth0.com'

};

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));



// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  console.log(req.oidc.isAuthenticated());
  res.render("index", {isAuthenticated: req.oidc.isAuthenticated()});
});



app.listen(3000)