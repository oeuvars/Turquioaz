const mongoose = require("mongoose");

const carDetails = new mongoose.Schema({
  carModel: { type: String, required: true },
  manufacturerName: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  photoLink: { type: String, required: true },
  published: { type: Boolean, required: true },
});

const Cars = mongoose.model("Cars", carDetails);
module.exports = Cars;
