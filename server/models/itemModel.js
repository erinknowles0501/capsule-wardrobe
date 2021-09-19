const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  seasons: Array,
  moods: Array,
  type: String,
  isBase: Boolean,
});

module.exports = mongoose.model("Item", itemSchema);
