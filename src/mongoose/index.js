import mongoose from "mongoose";
const url = "mongodb://127.0.0.1:27017/test";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

export default mongoose.connection;
