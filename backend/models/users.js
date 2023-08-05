const mongoose = require("mongoose");

const userData = new mongoose.Schema({
  //name:{type:String}
  userEmail: { type: String },
  password: { type: String },
  rentedCar: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cars" }],
  wishlistedCar: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cars" }],
});
const User = mongoose.model("User", userData);
module.exports = User;
