const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: String,
  email: String,
  password: String, // hashed
});

// TODO get user capsule. Only one for now, but writing this way for future multi-capsule functionality.

// TODO get user items ("wardrobe").

module.exports = mongoose.model("User", userSchema);
