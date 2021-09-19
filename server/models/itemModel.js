const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // this shouldn't be public (if id is 6, user might wonder what id==7 is)
  uid: String, // this can be public
  name: String,
  description: String,
  seasons: Array,
  moods: Array,
  type: String,
  isBase: Boolean,
});

module.exports = mongoose.model("Item", itemSchema);
