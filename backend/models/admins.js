const mongoose = require("mongoose");

const adminPanel = new mongoose.Schema({
  userEmail: { type: String },
  password: { type: String },
});

const Admin = mongoose.model("Admin", adminPanel);
module.exports = Admin;
