const mongoose = require("mongoose");

const itemUserPivotSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("ItemUserPivot", itemUserPivotSchema);
