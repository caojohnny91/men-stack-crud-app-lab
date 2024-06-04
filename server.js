const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

const Food = require("./models/food.js");

app.use(express.urlencoded({ extended: false }));
// this was created after making the new food submit form and before defining the post route

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/foods", async (req, res) => {
  const allFoods = await Food.find();
  // console.log(allFoods);
  res.render("foods/index.ejs", { foods: allFoods });
});

app.get("/foods/new", (req, res) => {
  res.render("foods/new.ejs");
});

app.post("/foods", async (req, res) => {
  if (req.body.isHealthy === "on") {
    req.body.isHealthy = true;
  } else {
    req.body.isHealthy = false;
  }
  await Food.create(req.body);
  res.redirect("/foods");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
