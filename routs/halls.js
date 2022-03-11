const { Router } = require("express");

const mongoose = require("mongoose");
const cinemaScheme = require("../model/schems/Cinema");
const hallScheme = require("../model/schems/Hall");
const router = Router();
const Hall = mongoose.model("hall", hallScheme);
const Cinema = mongoose.model("cinema", cinemaScheme);

router.post("/addhall", async (req, res) => {
  console.log(1);
  const { idCinema, places, name } = req.body;
  await Hall.create({ idCinema, places, name }, (err, doc) => {
    if (!err) {
      console.log(doc);
      res.status(200).send(doc);
    } else {
      console.log(err);
      res.send(err.message);
      res.status(404).end();
    }
  });
});
module.exports = router;
