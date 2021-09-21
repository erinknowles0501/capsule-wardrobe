const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  uid: String, // this is the public-facing identifier for the item (can't guess the next one from this one!)
  name: String,
  description: String,
  typeId: { type: Schema.Types.ObjectId, ref: "Type" }, // FK to Type lookup table
  isBase: Boolean,
});

// TODO get item moods

// TODO get item seasons

// TODO get item capsule (?) will this be needed?

module.exports = mongoose.model("Item", itemSchema);
