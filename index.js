const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR : jwtPrivateKey is not defined.');
  process.exit(1);
}

const url=process.env.MONGO_URL || "mongodb://localhost:27017/Auth";

mongoose.connect('mongodb+srv://kapil123:kapil123@cluster0.wjkqg.mongodb.net/security?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}
) 
  .then(() => console.log('Connected to MongoDB successfully....'))
  .catch(err => console.error('Could not connect to MongoDB....'));

  app.get('/', (req, res) => {
    res.send("Hello");
  })
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

