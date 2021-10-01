const mongoose = require("mongoose");

const itemCapsulePivotSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  capsuleId: { type: mongoose.Schema.Types.ObjectId, ref: "Capsule" },
});

itemCapsulePivotSchema.methods.getItemsInCapsule = function(uid) {};

module.exports = mongoose.model("ItemCapsulePivot", itemCapsulePivotSchema);
