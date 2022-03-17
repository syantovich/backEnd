const mongoose = require("mongoose");
const movieShema = require("../model/schems/Movie");
const Movie = mongoose.model("movie", movieShema);

exports.socketsInit = function (io) {
  io.on("connection", (socket) => {
    socket.on("click", (msg) => {
      console.log(msg);
    });
    socket.on("booking", async (i, j) => {
      console.log(await Movie.find({}));
    });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
};
