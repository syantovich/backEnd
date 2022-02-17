const { Router } = require("express");

const mongoose = require("mongoose");
const sessionSheme = require("../model/schems/Session");
const router = Router();
const Session = mongoose.model("session", sessionSheme);

router.post("/addsession", (req, res) => {
  Session.create({ timeStart: req.body.timeStart }, (err, doc) => {
    if (!err) {
      console.log(doc);
      res.status(200);
      res.send(doc);
    } else {
      res.status(404);
    }
  });
});
module.exports = router;
