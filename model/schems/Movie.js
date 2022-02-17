const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
  places: [[{ type: Number }]],
  idMovieInfo: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  idHall: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  idSession: {
    type: Schema.Types.ObjectId,
    required: true,
  }, // '16.00'
  date: {
    type: Date, // число/месяц/год показа
    required: true,
  },
  std: { type: Number },
  vip: { type: Number },
  sofa: { type: Number },
});
