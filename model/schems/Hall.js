const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
  idCinema: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  places: [[]],
  name: {
    type: String,
    required: true,
  },
});
