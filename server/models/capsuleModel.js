const mongoose = require("mongoose");

const capsuleSchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" }, // FK
});

// TODO get items in capsule

module.exports = mongoose.model("Capsule", capsuleSchema);
