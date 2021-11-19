const mongoose = require("mongoose");

const typesLookupSchema = new mongoose.Schema({
  label: String,
});

typesLookupSchema.statics.seed = async function() {
  // TODO: Pull this out, can be reused

  const existingTypesLen = this.find({}).length;

  if (existingTypesLen !== 0) {
    // delete all existing items, and re-seed.
    await this.deleteMany({});
  }

  const types = [
    "top",
    "bottom",
    "both",
    "shoes",
    "accessory",
    "cover",
    "other",
  ];

  this.insertMany([
    ...types.map((type) => {
      let typeObj = {};
      typeObj.label = type;
      typeObj.name = type;
      return typeObj;
    }),
  ]);
};

module.exports = mongoose.model("Types", typesLookupSchema);
