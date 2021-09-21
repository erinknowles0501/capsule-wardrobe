const mongoose = require("mongoose");

const typesLookupSchema = new mongoose.Schema({
  name: String,
  label: String,
});

module.exports = mongoose.model("Types", typesLookupSchema);
