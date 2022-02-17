const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
  timeStart: {
    type: String,
    required: true,
    unique: true,
  },
});
