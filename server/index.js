const express = require("express");
const cors = require("cors");
const db = require("./mongoose");

const Item = require("./models/itemModel");
const Capsule = require("./models/capsuleModel");
const User = require("./models/userModel");

const Moods = require("./lookups/moodsLookup");
const Types = require("./lookups/typesLookup");
const Seasons = require("./lookups/seasonsLookup");

db.once("open", () => {
  Moods.seed();
  Types.seed();
  Seasons.seed();
});

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

/**
 *  TODO: Validation + error forwarding.
 * */

app
  .route("/items")
  .get(async (req, res) =>
    res.json(
      await Item.find()
        .populate("Moods")
        .populate("Types")
        .populate("Seasons")
    )
  )
  .post((req, res) => {
    const newItem = new Item({ ...req.body });
    newItem.save();
  });

app
  .route("/items/:uid")
  .get(async (req, res) => {
    console.log("gettubg uten");
    res.json(
      await Item.find({ id: req.params.uid })
        .populate("moods")
        .populate("type")
        .populate("seasons")
    );
  })
  .post(async (req, res) => {
    console.log("posting item");
    console.log(req.body);
    await Item.updateOne(
      req.params.uid !== "new" ? { id: req.params.uid } : {},
      { ...req.body }
    );
    res.status(204);
  })
  .delete(async (req, res) => {
    console.log("deleting item");
    const hello = await Item.deleteOne({ id: req.params.uid });
    console.log(hello);
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

app.get("/moods", async (req, res) => {
  res.json(await Moods.find());
});

app.get("/types", async (req, res) => {
  res.json(await Types.find());
});

app.get("/seasons", async (req, res) => {
  res.json(await Seasons.find());
});

// app.get(/.*/, (req, res) =>
//   res.sendFile(path.resolve(__dirname, "public/index.html"))
// );

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
