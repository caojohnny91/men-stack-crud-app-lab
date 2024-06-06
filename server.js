const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const port = process.env.PORT || "3000";

const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

const Food = require("./models/food.js");

app.use(express.urlencoded({ extended: false }));
// this was created after making the new food submit form and before defining the post route
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

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

app.get("/foods/:foodId", async (req, res) => {
  const foundFood = await Food.findById(req.params.foodId);
  res.render("foods/show.ejs", { food: foundFood });
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

app.get("/foods/:foodId/edit", async (req, res) => {
  const foundFood = await Food.findById(req.params.foodId);
  res.render("foods/edit.ejs", { food: foundFood });
});

app.put("/foods/:foodId", async (req, res) => {
  if (req.body.isHealthy === "on") {
    req.body.isHealthy = true;
  } else {
    req.body.isHealthy = false;
  }
  await Food.findByIdAndUpdate(req.params.foodId, req.body);
  res.redirect(`/foods/${req.params.foodId}`);
});

app.delete("/foods/:foodId", async (req, res) => {
  await Food.findByIdAndDelete(req.params.foodId);
  res.redirect("/foods");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
