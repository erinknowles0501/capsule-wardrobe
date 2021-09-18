const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const items = new Schema({
  name: String,
  description: String,
  seasons: Array,
  moods: Array,
  type: String,
  isBase: Boolean,
});

module.exports = mongoose.model("Items", items);
