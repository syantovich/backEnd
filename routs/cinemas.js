const { Router } = require("express");

const mongoose = require("mongoose");
const cinemaScheme = require("../model/schems/Cinema");
const router = Router();
const Cinema = mongoose.model("cinema", cinemaScheme);

router.post("/addcinema", (req, res) => {
  Cinema.create(
    {
      name: req.body.name,
      workingTime: req.body.workingTime,
      contacts: req.body.contacts,
    },
    (err, doc) => {
      if (!err) {
        console.log(doc);
        res.status(200);
        res.send(doc);
      }
    }
  );
});
module.exports = router;
