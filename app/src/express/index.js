const express = require("express");
const cors = require("cors");
const db = require("../mongoose");
const ItemModel = require("../models/itemModel");

db.once("open", () => {});

const app = express();

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// simple route
app.get("/test", (req, res) => {
  //res.json({ message: "Welcome to application." });
  // const newItem = new ItemModel({
  //   name: "sdgsdgsdg",
  //   description: "msdfsdfsdfale",
  // });
  // newItem.save(function(error, document) {
  //   if (error) console.error(error);
  //   console.log(document);
  // });
  // res.json(newItem);
});

app.get(/.*/, (req, res) =>
  res.sendFile(path.resolve(__dirname, "public/index.html"))
);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
