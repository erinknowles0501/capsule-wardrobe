const mongoose = require("mongoose");
const Moods = require("../lookups/moodsLookup");
const Types = require("../lookups/typesLookup");
const Seasons = require("../lookups/seasonsLookup");

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  moods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Moods" }],
  type: { type: mongoose.Schema.Types.ObjectId, ref: "Types" },
  seasons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seasons" }],
});

// TODO get item seasons

// TODO get item capsule (?) will this be needed?

module.exports = mongoose.model("Item", itemSchema);
