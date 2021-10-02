const mongoose = require("mongoose");
const User = require("./userModel");
const Item = require("./itemModel");

const capsuleSchema = new mongoose.Schema({
  uid: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // FK
  seasons: {
    // TODO: Replace with virtual
    spring: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // needs population
    summer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // needs population
    fall: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // needs population
    winter: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // needs population
    base: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // needs population
  },
});

module.exports = mongoose.model("Capsule", capsuleSchema);
