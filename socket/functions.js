const movieShema = require("../model/schems/Movie");
const mongoose = require("mongoose");
const Movie = mongoose.model("movie", movieShema);

const socketEvents = {
  updateOneSeat(_id, i, j, newValue) {
    async (_id, i, j, newValue) => {
      Movie.findOne({});
    };
  },
};
module.exports = { socketEvents };
