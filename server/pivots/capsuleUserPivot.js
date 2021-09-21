const mongoose = require("mongoose");

const capsuleUserPivotSchema = new mongoose.Schema({
  capsuleId: { type: Schema.Types.ObjectId, ref: "Capsule" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("CapsuleUserPivot", capsuleUserPivotSchema);
