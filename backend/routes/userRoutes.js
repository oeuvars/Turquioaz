const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const authentication = require("../middlewares/auth");

const User = require("../models/users");
const Cars = require("../models/cars");

router.post("/signup", async (req, res) => {
  const { userEmail, password } = req.body;
  const user = await User.findOne({ userEmail });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ userEmail, password });
    await newUser.save();
    const token = jwt.sign({ userEmail, role: "user" }, process.env.hiddenKey, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { userEmail, password } = req.body;
  const user = await User.findOne({ userEmail, password });
  if (user) {
    const token = jwt.sign({ userEmail, role: "user" }, process.env.hiddenKey, {
      expiresIn: "14h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid userEmail or password" });
  }
});

router.get("/cars", authentication, async (req, res) => {
  const cars = await Cars.find({ published: true });
  res.json({ cars });
});

router.post("/cars/:carId", authentication, async (req, res) => {
  const car = await Cars.findById(req.params.carId);
  console.log(car);
  if (car) {
    const user = await User.findOne({ userEmail: req.user.userEmail });
    if (user) {
      user.rentedCar.push(car);
      await user.save();
      res.json({ message: "Car Rented successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

router.get("/rentedCars", authentication, async (req, res) => {
  const user = await User.findOne({ userEmail: req.user.userEmail }).populate(
    "rentedCar"
  );
  if (user) {
    res.json({ rentedCar: user.rentedCar || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

router.post("/wishlist/cars/:carId", authentication, async (req, res) => {
  const car = await Cars.findById(req.params.carId);
  console.log(car);
  if (car) {
    const user = await User.findOne({ userEmail: req.user.userEmail });
    if (user) {
      user.wishlistedCar.push(car);
      await user.save();
      res.json({ message: "Ride is in your wishlist" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

router.get("/wishlistedCar", authentication, async (req, res) => {
  const user = await User.findOne({ userEmail: req.user.userEmail }).populate(
    "wishlistedCar"
  );
  if (user) {
    res.json({ wishlistedCar: user.wishlistedCar || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

module.exports = router;
