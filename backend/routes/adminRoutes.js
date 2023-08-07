const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const authentication = require("../middlewares/auth");

const Admin = require("../models/admins");
const Cars = require("../models/cars");

router.post("/signup", async (req, res) => {
  const { userEmail, password } = req.body;
  const admin = await Admin.findOne({ userEmail });
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const object = { userEmail, password };
    const newAdmin = new Admin(object);
    await newAdmin.save();
    const token = jwt.sign(
      { userEmail, role: "admin" },
      process.env.hiddenKey,
      {
        expiresIn: "1h",
      }
    );
    res.json({ message: "Admin created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { userEmail, password } = req.body;
  const admin = await Admin.findOne({ userEmail, password });
  if (admin) {
    const token = jwt.sign(
      { userEmail, role: "admin" },
      process.env.hiddenKey,
      {
        expiresIn: "1h",
      }
    );
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/cars", authentication, async (req, res) => {
  const car = new Cars(req.body);
  await car.save();
  res.json({
    message: "New Car is listed successfully",
    carId: car.id,
  });
});

router.put("/cars/:carId", authentication, async (req, res) => {
  const car = await Cars.findByIdAndUpdate(req.params.carId, req.body, {
    new: true,
  });
  if (car) {
    res.json({ message: "Car details is now updated" });
  } else {
    res.status(404).json({ message: "BREAKS!! No car found" });
  }
});

router.get("/cars", authentication, async (req, res) => {
  const cars = await Cars.find({});
  res.json({ cars });
});

module.exports = router;
