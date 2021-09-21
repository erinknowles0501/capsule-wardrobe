const mongoose = require("mongoose");

const itemSeasonsPivotSchema = new mongoose.Schema({
  itemId: { type: Schema.Types.ObjectId, ref: "Item" },
  seasonId: { type: Schema.Types.ObjectId, ref: "Seasons" },
});

module.exports = mongoose.model("ItemSeasonsPivot", itemSeasonsPivotSchema);
