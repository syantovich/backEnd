const { Router } = require("express");

const mongoose = require("mongoose");
const hallScheme = require("../model/schems/Hall");
const movieShema = require("../model/schems/Movie");
const movieInfoShema = require("../model/schems/MovieInfo");

const router = Router();
const Hall = mongoose.model("hall", hallScheme);
const Movie = mongoose.model("movie", movieShema);
const ObjectId = mongoose.Types.ObjectId;
const MovieInfo = mongoose.model("movieinfo", movieInfoShema);

router.post("/addmovie", async (req, res) => {
  let hall = await Hall.findOne({ _id: req.body.idHall });
  console.log(hall);
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
router.get("/get/session/:_id", async (req, res) => {
  let { _id } = req.params;
  let response = await Movie.aggregate([
    {
      $lookup: {
        from: "sessions",
        localField: "idSession",
        foreignField: "_id",
        as: "session",
      },
    },
    {
      $unwind: {
        path: "$session",
        preserveNullAndEmptyArrays: true,
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
      $lookup: {
        from: "halls",
        localField: "idHall",
        foreignField: "_id",
        as: "hall",
      },
    },
    {
      $unwind: {
        path: "$hall",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "cinemas",
        localField: "hall.idCinema",
        foreignField: "_id",
        as: "cinema",
      },
    },
    {
      $unwind: {
        path: "$cinema",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $match: {
        _id: ObjectId(_id),
      },
    },
  ]);
  console.log(response);
  if (response.length > 0) {
    res.send(response[0]);
  } else {
    res.status(404);
    res.send({});
  }
});
router.post("/get/:id", async (req, res) => {
  let sessions = await Movie.aggregate([
    {
      $lookup: {
        from: "sessions",
        localField: "idSession",
        foreignField: "_id",
        as: "session",
      },
    },
    {
      $unwind: {
        path: "$session",
        preserveNullAndEmptyArrays: true,
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
    { $sort: { idHall: 1, idSession: 1 } },
    {
      $lookup: {
        from: "halls",
        localField: "idHall",
        foreignField: "_id",
        as: "hall",
      },
    },
    {
      $unwind: {
        path: "$hall",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "cinemas",
        localField: "hall.idCinema",
        foreignField: "_id",
        as: "cinema",
      },
    },
    {
      $unwind: {
        path: "$cinema",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $match: {
        idMovieInfo: ObjectId(req.params.id),
        date: new Date(req.body.dateWatching),
      },
    },
  ]);
  console.log(sessions.length);
  res.send(sessions);
});

module.exports = router;
