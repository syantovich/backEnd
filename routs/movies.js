const { Router } = require("express");

const mongoose = require("mongoose");
const hallScheme = require("../model/schems/Hall");
const movieShema = require("../model/schems/Movie");
const router = Router();
const Hall = mongoose.model("hall", hallScheme);
const Movie = mongoose.model("movie", movieShema);

router.post("/addmovie", async (req, res) => {
  let hall = await Hall.findOne({ _id: req.body.idHall });
  let Arr = hall.places.map((e) => {
    e = e.map(() => {
      return 0;
    });
    return e;
  });
  Movie.create(
    {
      idMovieInfo: req.body.idMovieInfo,
      places: Arr,
      idHall: req.body.idHall,
      idSession: req.body.idSession,
      date: req.body.date,
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

router.get("/get", async (req, res) => {
  let limit = 5;

  let skip = req.query.p ? (req.query.p - 1) * limit - 1 : 0;
  console.log(req.query.p);
  let x = await Movie.aggregate([
    {
      $lookup: {
        from: "halls",
        localField: "idHall",
        foreignField: "_id",
        as: "hall",
      },
    },
    {
      $lookup: {
        from: "sessions",
        localField: "idSession",
        foreignField: "_id",
        as: "session",
      },
    },
    {
      $lookup: {
        from: "movieinfos",
        localField: "idMovieInfo",
        foreignField: "_id",
        as: "info",
      },
    },
    {
      $unwind: {
        path: "$info",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$session",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$hall",
        preserveNullAndEmptyArrays: true,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);
  res.send(x);
});
module.exports = router;
