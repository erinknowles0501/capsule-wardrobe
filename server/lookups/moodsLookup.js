const mongoose = require("mongoose");

const moodsLookupSchema = new mongoose.Schema({
  label: String,
});

moodsLookupSchema.statics.seed = async function() {
  // TODO: Pull this out, can be reused

  const existingMoodsLen = this.find({}).length;

  if (existingMoodsLen !== 0) {
    // delete all existing items, and re-seed.
    await this.deleteMany({});
  }

  const moods = ["classy", "sporty", "comfy", "basic", "fun", "work"];

  this.insertMany([
    ...moods.map((mood) => {
      let moodObj = {};
      moodObj.label = mood;
      moodObj.name = mood;
      return moodObj;
    }),
  ]);
};

module.exports = mongoose.model("Moods", moodsLookupSchema);
