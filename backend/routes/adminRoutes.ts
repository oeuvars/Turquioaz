import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";

import { authentication } from "../middlewares/auth";

import prisma from "../DB/db.config";

// SIGN UP FOR NEW USER

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const admin = await prisma.admin.findUnique({
    where: { adminMail: email },
  });
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const newAdmin = await prisma.admin.create({
      data: {
        name: name,
        adminMail: email,
        password: password,
      },
    });
    const token = jwt.sign(
      { email, role: "admin" },
      process.env.hiddenKey as string,
      {
        expiresIn: "24h",
      }
    );
    res.json({ message: "Admin created successfully", token });
  }
});

// ADMIN LOGIN

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await prisma.admin.findUnique({
    where: {
      adminMail: email,
      password: password,
    },
  });
  if (admin) {
    const token = jwt.sign(
      { email, role: "admin" },
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

// ADMIN GET ALL CARS

router.get("/inventory", authentication, async (req, res) => {
  const cars = await prisma.model.findMany();
  res.json(cars);
});

// ADMIN GET SINGLE CAR
router.get("/inventory/:id", authentication, async (req, res) => {
  const car = await prisma.model.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(car);
});

// ADMIN ADD CARS

router.post("/inventory/addCar", authentication, async (req, res) => {
  const admin = await prisma.admin.findUnique({
    where: { adminMail: req.user.email },
  });
  if (admin) {
    const newModel = await prisma.model.create({
      data: {
        carId: parseInt(req.body.carId),
        name: req.body.name,
        transmission: req.body.transmission,
        fuelType: req.body.fuelType,
        seatNumbers: parseInt(req.body.seatNumbers),
        condition: req.body.condition,
        price: parseInt(req.body.price),
        rentPrice: parseInt(req.body.rentPrice),
        published: req.body.published,
      },
    });

    res.json({ message: "New Car Added", newModel });
  } else {
    res.status(403).json({ message: "Admin not found" });
  }
});

// ADMIN UPDATE CARS

router.put("/inventory/:id", authentication, async (req, res) => {
  const id = parseInt(req.params.id);

  const admin = await prisma.admin.findUnique({
    where: { adminMail: req.user.email },
  });
  if (admin) {
    const updatedModel = await prisma.model.update({
      where: { id: id },
      data: {
        carId: parseInt(req.body.carId),
        name: req.body.name,
        transmission: req.body.transmission,
        fuelType: req.body.fuelType,
        seatNumbers: parseInt(req.body.seatNumbers),
        condition: req.body.condition,
        price: parseInt(req.body.price),
        rentPrice: parseInt(req.body.rentPrice),
        published: req.body.published,
      },
    });

    res.json({ message: "Car Details updated", updatedModel });
  }
});

// ADMIN DELETE CARS

router.delete("/inventory/:id", authentication, async (req, res) => {
  const id = parseInt(req.params.id);
  const admin = await prisma.admin.findUnique({
    where: { adminMail: req.user.email },
  });
  if (admin) {
    const deletedModel = await prisma.model.delete({
      where: { id: id },
    });
    res.json({ message: "Car deleted", deletedModel });
  }
});

export default router;
