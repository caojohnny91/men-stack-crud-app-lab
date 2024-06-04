const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: String,
  tasteRating: { type: Number, min: 0, max: 5 },
  isHealthy: Boolean,
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
