const mongoose = require("mongoose");

const seasonsLookupSchema = new mongoose.Schema({
  name: String,
  label: String,
});

module.exports = mongoose.model("Seasons", seasonsLookupSchema);
