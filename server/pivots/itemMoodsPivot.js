const mongoose = require("mongoose");

const itemMoodsPivotSchema = new mongoose.Schema({
  itemId: { type: Schema.Types.ObjectId, ref: "Item" },
  moodId: { type: Schema.Types.ObjectId, ref: "Moods" },
});

module.exports = mongoose.model("ItemMoodsPivot", itemMoodsPivotSchema);
