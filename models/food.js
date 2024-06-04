const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: String,
  isHealthy: Boolean,
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
