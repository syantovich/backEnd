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
      img:
        req.body.img ||
        "https://static.cdek.market/images/market/38acc9a2a52efb9e1bda3fa682eaad09.jpg",
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
router.post("/getfilms", async (req, res) => {
  let dataNow = new Date();
  switch (req.body.type) {
    case "now":
      res.send(
        await MovieInfo.aggregate([
          {
            $match: {
              dateStart: { $lte: dataNow },
              dateEnd: { $gte: dataNow },
            },
          },
        ])
      );
      break;
    case "soon":
      res.send(
        await MovieInfo.aggregate([
          {
            $match: {
              dateStart: { $gte: dataNow },
            },
          },
        ])
      );
      break;
    default:
      {
        res.send([]);
      }
      break;
  }
});
router.post("/category", async (req, res) => {
  let limit = 8;
  const nameCategory = req.body.category;
  let dataNow = new Date();
  const allFilmsNow = await MovieInfo.aggregate([
    {
      $match: {
        dateStart: { $lte: dataNow },
        dateEnd: { $gte: dataNow },
      },
    },
  ]);
  let sortArr = allFilmsNow.filter((e) => e[nameCategory] == true);
  const maxPage = Math.floor(sortArr.length / limit);
  const skipedArr = sortArr.filter(
    (e, i) => i < limit * req.body.page && i >= (req.body.page - 1) * limit
  );
  console.log(maxPage);
  console.log(skipedArr);
  res.send({ maxPage, skipedArr });
});

router.get("/getinfo/:id", async (req, res) => {
  res.send(await MovieInfo.findOne({ _id: req.params.id }));
});

module.exports = router;
