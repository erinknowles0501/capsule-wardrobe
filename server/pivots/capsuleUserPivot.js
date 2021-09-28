const mongoose = require("mongoose");

const capsuleUserPivotSchema = new mongoose.Schema({
  capsuleId: { type: mongoose.Schema.Types.ObjectId, ref: "Capsule" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("CapsuleUserPivot", capsuleUserPivotSchema);
