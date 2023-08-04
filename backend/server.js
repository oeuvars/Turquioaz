const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const app = express();
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const supabase = require("./auth");
const Stripe = require("stripe");

app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

let ADMINS = [];
let USERS = [];
let CARS = [];

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

const hiddenkey = "softhack@2023";

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

app.post("/create-checkout-session", async (req, res) => {
  try {
    const Key = process.env.VITE_STRIPE_SECRET_KEY;
    const stripe = new Stripe(Key, {
      apiVersion: "2022-11-15",
    });

    const { paymentId } = req.body; // Assuming you're sending the paymentId in the request body

    if (!paymentId) {
      console.error("Payment ID is missing in the request body.");
      res.status(400).send("Payment ID is required.");
      return;
    }

    const { data: paymentData } = await supabase
      .from("payment")
      .select("theModel, theDays, userId")
      .eq("id", paymentId)
      .single();

    const { theModel, theDays, userId } = paymentData;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user === userId) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: theModel, // Use the correct theModel
              },
              unit_amount: theDays * 100, // Use the correct theDays
            },
            quantity: selectedDay(),
          },
        ],
        shipping_address_collection: {
          allowed_countries: ["IN"],
        },
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: `http://localhost:3000/collections`,
      });

      if (session.url) {
        res.redirect(303, session.url);
      } else {
        console.error("Error creating Stripe Checkout session: Session URL is null.");
        res.status(500).send("Error creating Stripe Checkout session.");
      }
    } else {
      console.error("Invalid user. User not authorized to create a checkout session.");
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error("Error occurred while creating Stripe Checkout session:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => console.log("Server running on port 4000"));
