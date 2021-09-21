const mongoose = require("mongoose");

const itemUserPivotSchema = new mongoose.Schema({
  itemId: { type: Schema.Types.ObjectId, ref: "Item" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("ItemUserPivot", itemUserPivotSchema);
