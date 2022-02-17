const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  workingTime: {
    type: String,
    required: true,
  },
  contacts: {
    type: String,
  },
});
