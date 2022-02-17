const { Router } = require("express");

const mongoose = require("mongoose");
const cinemaScheme = require("../model/schems/Cinema");
const hallScheme = require("../model/schems/Hall");
const movieInfoShema = require("../model/schems/MovieInfo");
const router = Router();
const Hall = mongoose.model("hall", hallScheme);
const Cinema = mongoose.model("cinema", cinemaScheme);
const MovieInfo = mongoose.model("movieinfo", movieInfoShema);

router.post("/addmovieinfo", (req, res) => {
  MovieInfo.create(
    {
      name: req.body.name,
      actors: req.body.actors,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      filmLength: req.body.filmLength,
      description: req.body.description,
      comedy: req.body.comedy,
      horror: req.body.horror,
      action: req.body.action,
      melodrama: req.body.melodrama,
      fantasy: req.body.fantasy,
      cartoon: req.body.cartoon,
      thriller: req.body.thriller,
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
  ]);
  res.send(x);
});
module.exports = router;
