const mongoose = require("mongoose");
const stream = require("stream");
const Schema = mongoose.Schema;

module.exports = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  actors: [{ type: String }],
  dateStart: {
    type: Date, // первый день показа
    required: true,
  },
  dateEnd: {
    type: Date, //последний день показа
    required: true,
  },
  filmLength: { type: Number }, //мс
  description: {
    type: String,
    required: true,
  },
  comedy: { type: Boolean },
  horror: { type: Boolean },
  action: { type: Boolean },
  melodrama: { type: Boolean },
  fantasy: { type: Boolean },
  cartoon: { type: Boolean },
  thriller: { type: Boolean },
});
