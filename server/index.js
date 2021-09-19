const express = require("express");
const cors = require("cors");
const db = require("./mongoose");
const Item = require("./models/itemModel");

db.once("open", () => {});

const app = express();

var corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const newItem = new Item({
  name: "sdgsdgsdg",
  description: "msdfsdfsdfale",
});
newItem.save(function(error, document) {
  if (error) console.error(error);
});

app
  .route("/items")
  .get(async (req, res) => res.send(await Item.find()))
  .post((req, res) => res.json({ hello: "no" }));

app.route("/items/:uid").get((req, res) => console.log(("hello", req.params)));

app.get("/closets/:uid", (req, res) =>
  res.sendFile(path.resolve(__dirname, "public/index.html"))
);

// app.get(/.*/, (req, res) =>
//   res.sendFile(path.resolve(__dirname, "public/index.html"))
// );

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
