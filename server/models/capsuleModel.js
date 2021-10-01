const mongoose = require("mongoose");

const capsuleSchema = new mongoose.Schema({
  uid: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // FK
  seasons: {
    spring: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // needs population
    summer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // needs population
    fall: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // needs population
    winter: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // needs population
    base: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // needs population
  },
});

module.exports = mongoose.model("Capsule", capsuleSchema);
