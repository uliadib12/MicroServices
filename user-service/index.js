const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
const Router = require('./routes')

const mongoose = require('mongoose');
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const URL_MONGO = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.qu1ssig.mongodb.net/userDB?retryWrites=true&w=majority`

async function connectToMongo() {
  await mongoose.connect(URL_MONGO)
                  .then(() => console.log('Connected to MongoDB'))
                  .catch(err => console.log(err));
}

async function main() {
  await connectToMongo();

  app.use(Router)
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main();