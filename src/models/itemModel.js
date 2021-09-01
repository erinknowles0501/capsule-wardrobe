import mongoose from "mongoose";

const Schema = mongoose.Schema;

const items = new Schema({
  name: String,
  description: String,
  seasons: Array,
  moods: Array,
  type: String,
  isBase: Boolean,
});

export default mongoose.model("Items", items);
