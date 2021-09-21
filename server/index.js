const express = require("express");
const cors = require("cors");
const db = require("./mongoose");
const Item = require("./models/itemModel");

db.once("open", () => {});

const app = express();

var corsOptions = {
  // TODO: get from env
  //origin: "http://localhost:8000",
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app
  .route("/items")
  .get(async (req, res) => res.json(await Item.find()))
  .post((req, res) => {
    const newItem = new Item({ ...req.body }); // TODO: Validation + error forwarding
    newItem.save();
  });

app
  .route("/items/:uid")
  .get(async (req, res) => {
    res.json(await Item.find({ uid: req.params.uid }));
  })
  .post(async (req, res) => {
    const item = await Item.updateOne(
      { uid: req.params.uid },
      { ...req.body },
      { upsert: true }
    );
    // .then((res) => console.log("server then", res))
    // .catch((e) => console.log("server e", e)); // TODO: Validation + error forwarding
    //console.log(item);
    res.status(204);
  });

app.get("/closets/:uid", (req, res) =>
  res.sendFile(path.resolve(__dirname, "public/index.html"))
);

// app.get(/.*/, (req, res) =>
//   res.sendFile(path.resolve(__dirname, "public/index.html"))
// );

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
