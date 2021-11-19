const mongoose = require("mongoose");

const seasonsLookupSchema = new mongoose.Schema({
  label: String,
  color: String, // TODO: Implement this
});

seasonsLookupSchema.statics.seed = async function() {
  // TODO: Pull this out, can be reused

  const existingSeasonsLen = this.find({}).length;

  if (existingSeasonsLen !== 0) {
    // delete all existing items, and re-seed.
    await this.deleteMany({});
  }

  const seasons = ["winter", "spring", "summer", "fall"];

  this.insertMany([
    ...seasons.map((season) => {
      let seasonObj = {};
      seasonObj.label = season;
      seasonObj.name = season;
      return seasonObj;
    }),
  ]);
};

module.exports = mongoose.model("Seasons", seasonsLookupSchema);
