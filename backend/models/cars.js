const mongoose = require("mongoose");

const carDetails = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  manufacturerName: { type: String, required: true },
  transmission: { type: String, required: true },
  fueltype: { type: String, required: true },
  seatNumbers: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: Number, required: true },
  rentprice: { type: Number, required: true },
  photoLink: { type: String, required: true },
  published: { type: Boolean, required: true },
});

const Cars = mongoose.model("Cars", carDetails);
module.exports = Cars;
