import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";

import { authentication } from "../middlewares/auth";

import prisma from "../DB/db.config";

//USER SIGNUP

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    const token = jwt.sign(
      { email, role: "user" },
      process.env.hiddenKey as string,
      {
        expiresIn: "1h",
      }
    );
    res.json({ message: "User created successfully", token });
  }
});

//USER LOGIN

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
      password: password,
    },
  });
  if (user) {
    const token = jwt.sign(
      { email, role: "user" },
      process.env.hiddenKey as string,
      {
        expiresIn: "24h",
      }
    );
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid email or password" });
  }
});

//GET ALL MODELS

router.get("/inventory", authentication, async (req, res) => {
  const models = await prisma.model.findMany({
    where: { published: true },
  });
  res.json({ models });
});

// GET BY BRANDS

router.get("/cars/brands/:id", authentication, async (req, res) => {
  const id = parseInt(req.params.id);
  const car = await prisma.cars.findMany({
    where: { id: id },
  });
  try {
    res.json({ car });
  } catch (error: any) {
    res.json({ error });
  }
});

//GET A SINGLE CAR

router.get("/car/:id", authentication, async (req, res) => {
  const id = parseInt(req.params.id);
  const model = await prisma.model.findUnique({
    where: { id: id },
  });
  try {
    res.json({ model });
  } catch (error: any) {
    res.json({ error });
  }
});

// RENT A CAR

router.post("/cars/:id", authentication, async (req, res) => {
  const { startDate, endDate, status } = req.body;
  const id = parseInt(req.params.id);
  const car = await prisma.model.findUnique({
    where: {
      id: id,
    },
  });
  console.log(car);
  if (car) {
    const user = await prisma.user.findUnique({
      where: {
        email: req.user.email,
      },
    });
    if (user) {
      const carID = car.id;
      const userID = user.id;
      await prisma.rentedCar.create({
        data: {
          carId: carID,
          rentedtoId: userID,
          startDate: startDate,
          endDate: endDate,
          status: status,
        },
      });
      res.json({ message: "Car Rented successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

// GET RENTED CARS
router.get("/rentedCars", authentication, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.user.email,
    },
    include: {
      onRent: true,
    },
  });
  if (user) {
    res.json({ rentedCars: user.onRent });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

//PUT IT IN WISHLIST

router.post("/wishlist/:id", authentication, async (req, res) => {
  const id = parseInt(req.params.id);
  const car = await prisma.model.findUnique({ where: { id: id } });
  console.log(car);
  if (car) {
    const user = await prisma.user.findUnique({
      where: {
        email: req.user.email,
      },
    });
    if (user) {
      const userID = user.id;
      const carID = car.id;
      await prisma.wishlistedCar.create({
        data: {
          wishlistedbyId: userID,
          carId: carID,
        },
      });
      //await user.save();
      res.json({ message: "Ride is in your wishlist" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

//GET WISHLISTED CARS

router.get("/wishlistedCar", authentication, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.user.email,
    },
    include: {
      onWishlist: true,
    },
  });
  if (user) {
    res.json({ wishlistedCar: user.onWishlist || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

export default router;
