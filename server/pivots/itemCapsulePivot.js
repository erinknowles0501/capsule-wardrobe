const mongoose = require("mongoose");

const itemCapsulePivotSchema = new mongoose.Schema({
  itemId: { type: Schema.Types.ObjectId, ref: "Item" },
  capsuleId: { type: Schema.Types.ObjectId, ref: "Capsule" },
});

module.exports = mongoose.model("ItemCapsulePivot", itemCapsulePivotSchema);
