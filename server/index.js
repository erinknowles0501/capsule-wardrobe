const express = require("express");
const cors = require("cors");
const db = require("./mongoose");

const Item = require("./models/itemModel");
const Capsule = require("./models/capsuleModel");

db.once("open", () => {});

const app = express();

var corsOptions = {
  // TODO: get from env
  origin: "http://localhost:3001",
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

app
  .route("/capsules/:uid")
  .get(async (req, res) => {
    // TODO: replace with virtual
    const capsule = await Capsule.findOne({ uid: req.params.uid })
      .populate({
        path: "seasons",
        populate: { path: "spring", model: "Item" },
      })
      .populate({
        path: "seasons",
        populate: { path: "summer", model: "Item" },
      })
      .populate({
        path: "seasons",
        populate: { path: "fall", model: "Item" },
      })
      .populate({
        path: "seasons",
        populate: { path: "winter", model: "Item" },
      })
      .populate({
        path: "seasons",
        populate: { path: "base", model: "Item" },
      })
      .populate("user");
    console.log(JSON.stringify(capsule));
    res.json(capsule);
  })
  .post(async (req, res) => {
    const capsule = await Capsule.updateOne(
      { uid: req.params.uid },
      { ...req.body },
      { upsert: true }
    );
    res.status(204);
  });

// app.get(/.*/, (req, res) =>
//   res.sendFile(path.resolve(__dirname, "public/index.html"))
// );

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
