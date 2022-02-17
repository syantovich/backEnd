const { Router } = require("express");

const mongoose = require("mongoose");
const cinemaScheme = require("../model/schems/Cinema");
const hallScheme = require("../model/schems/Hall");
const router = Router();
const Hall = mongoose.model("hall", hallScheme);
const Cinema = mongoose.model("cinema", cinemaScheme);

router.post("/addhall", (req, res) => {
  Hall.create(
    {
      idCinema: req.body.idCinema,
      places: req.body.places,
      name: req.body.name,
    },
    (err, doc) => {
      if (!err) {
        console.log(doc);
        res.status(200);
        res.send(doc);
      } else {
        res.status(404);
      }
    }
  );
});
module.exports = router;
