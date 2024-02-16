const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  placename: String,
  imagesrc: String,
  location: String,
  key: String,
});

const tourModel = mongoose.model("tours", tourSchema);
module.exports = tourModel;
