const express = require('express');
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const port = process.env.PORT || 5000

require('dotenv').config();
const app = express();



mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
  	console.log(`Launched @ port ${port}`);
  	app.listen(port);
  })
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.json())

app.use(express.urlencoded({ extended: true }));


app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

