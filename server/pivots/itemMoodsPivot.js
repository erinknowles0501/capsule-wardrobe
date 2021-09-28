const mongoose = require("mongoose");

const itemMoodsPivotSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  moodId: { type: mongoose.Schema.Types.ObjectId, ref: "Moods" },
});

module.exports = mongoose.model("ItemMoodsPivot", itemMoodsPivotSchema);
