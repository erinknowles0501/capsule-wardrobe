const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
import db from "@/mongoose";

db.once("open", (_) => {
  console.log("Database connected");
});

const app = express();

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get(/.*/, (req, res) =>
  res.sendFile(path.resolve(__dirname, "public/index.html"))
);

// simple route
// app.get("/test", (req, res) => {
//   res.json({ message: "Welcome to application." });
//   //   const newItem = new ItemModel({
//   //     name: "sdgsdgsdg",
//   //     description: "msdfsdfsdfale",
//   //   });
//   //   newItem.save(function(error, document) {
//   //     if (error) console.error(error);
//   //     console.log(document);
//   //   });
//   //   res.json(newItem);
// });

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
