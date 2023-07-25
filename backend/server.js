const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const app = express();
const path = require("path")
const cors = require('cors');
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


let ADMINS = [];
let USERS = [];
let CARS = [];

// Read data from file, or initialize to empty array if file does not exist
try {
  ADMINS = JSON.parse(fs.readFileSync("admins.json", "utf8"));
  USERS = JSON.parse(fs.readFileSync("users.json", "utf8"));
  CARS = JSON.parse(fs.readFileSync("cars.json", "utf8"));
} catch {
  ADMINS = [];
  USERS = [];
  CARS = [];
}
console.log(ADMINS);

const hiddenkey = "car&cars";

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, hiddenkey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Admin routes
app.post("/admin/signup", (req, res) => {
  const { username, password } = req.body;
  const admin = ADMINS.find((a) => a.username === username);
  console.log("admin signup");
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const newAdmin = { username, password };
    ADMINS.push(newAdmin);
    fs.writeFileSync("admins.json", JSON.stringify(ADMINS));
    const token = jwt.sign({ username, role: "admin" }, hiddenkey, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

app.post("/admin/login", (req, res) => {
  const { username, password } = req.headers;
  const admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, hiddenkey, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.post("/admin/cars", authenticateJwt, (req, res) => {
  const car = req.body;
  car.id = CARS.length + 1;
  CARS.push(car);
  fs.writeFileSync("cars.json", JSON.stringify(CARS));
  res.json({ message: "Car added successfully", carId: car.id });
});

app.put("/admin/cars/:carId", authenticateJwt, (req, res) => {
  const car = CARS.find((c) => c.id === parseInt(req.params.carId));
  if (car) {
    Object.assign(car, req.body);
    fs.writeFileSync("cars.json", JSON.stringify(CARS));
    res.json({ message: "Car updated successfully" });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

app.get("/admin/cars", authenticateJwt, (req, res) => {
  res.json({ cars: CARS });
});

// User routes
app.post("/users/signup", (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find((u) => u.username === username);
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = { username, password };
    USERS.push(newUser);
    fs.writeFileSync("users.json", JSON.stringify(USERS));
    const token = jwt.sign({ username, role: "user" }, hiddenkey, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});

app.post("/users/login", (req, res) => {
  const { username, password } = req.headers;
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign({ username, role: "user" }, hiddenkey, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.get("/users/cars", authenticateJwt, (req, res) => {
  res.json({ cars: CARS });
});

app.post("/users/cars/:carId", authenticateJwt, (req, res) => {
  const car = CARS.find((c) => c.id === parseInt(req.params.carId));
  if (car) {
    const user = USERS.find((u) => u.username === req.user.username);
    if (user) {
      if (!user.rentedCars) {
        user.rentedCars = [];
      }
      user.rentedCars.push(car);
      fs.writeFileSync("users.json", JSON.stringify(USERS));
      const randomId = Math.floor(Math.random() * 1000) + 1;
      res.json({
        message: "Car rented successfully",
        message2:
          "Your RentandRide Id is " +
          randomId +
          ", plese show this during check-in and checkout and pay it to our RidenFriend your fare.",
      });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

app.get("/users/rentedCars", authenticateJwt, (req, res) => {
  const user = USERS.find((u) => u.username === req.user.username);
  if (user) {
    res.json({ rentedCars: user.rentedCars || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

app.post("/users/cars/wishlist/:carId", authenticateJwt, (req, res) => {
  const car = CARS.find((c) => c.id === parseInt(req.params.carId));
  if (car) {
    const user = USERS.find((u) => u.username === req.user.username);
    if (user) {
      if (!user.yourwishlist) {
        user.yourwishlist = [];
      }
      user.yourwishlist.push(car);
      fs.writeFileSync("users.json", JSON.stringify(USERS));
      res.json({
        message: "added for your future ride",
      });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

app.get("/users/yourwishlist", authenticateJwt, (req, res) => {
  const user = USERS.find((u) => u.username === req.user.username);
  if (user) {
    res.json({ yourwishlist: user.yourwishlist || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

app.listen(PORT, () => console.log("Server running on port 4000"));
