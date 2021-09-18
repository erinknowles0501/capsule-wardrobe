const mongoose = require("mongoose");
//const url = "mongodb://127.0.0.1:8080/capsule-wardrobe";
const url = "mongodb://localhost/capsule-wardrobe";

mongoose.set("useCreateIndex", true);
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((e) => console.log("e from connect catch", e));

module.exports = mongoose.connection;
