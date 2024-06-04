const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () =>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});


app.get('/', async (req, res) => {
    res.send('hello, friend!')
})



















app.listen(3000, () => {
  console.log("Listening on port 3000");
});