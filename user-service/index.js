const dotenv = require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose');
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const URL_MONGO = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.qu1ssig.mongodb.net/userDB?retryWrites=true&w=majority`

async function connectToMongo() {
  await mongoose.connect(URL_MONGO)
                  .then(() => console.log('Connected to MongoDB'));
}

async function main() {
  await connectToMongo();

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });
  
  const User = mongoose.model('user', userSchema);

  const user = new User({
    name: 'John',
    email: 'john@gmail.com',
    password: '123456',
  });

  await user.save();
  console.log('User created');

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main();