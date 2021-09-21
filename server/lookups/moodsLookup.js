const mongoose = require("mongoose");

const moodsLookupSchema = new mongoose.Schema({
  name: String,
  label: String,
});

module.exports = mongoose.model("Moods", moodsLookupSchema);
