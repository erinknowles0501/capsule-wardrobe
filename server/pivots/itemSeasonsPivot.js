const mongoose = require("mongoose");

const itemSeasonsPivotSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  seasonId: { type: mongoose.Schema.Types.ObjectId, ref: "Seasons" },
});

module.exports = mongoose.model("ItemSeasonsPivot", itemSeasonsPivotSchema);
