import express from "express";
import { authentication } from "../middleware/authenticator";
import { register } from "controllers/user/auth/register";
import { login } from "controllers/user/auth/login";
import { verifyRegistration } from "controllers/user/auth/verify-registration";
import { forgotPassword } from "controllers/user/auth/forgot-password";
import { verifyUpdation } from "controllers/user/auth/verify-updation";
import { resetPassword } from "controllers/user/auth/reset-password";
import { inventory } from "controllers/user/collections/inventory";
import { singleCar } from "controllers/user/collections/single-car";
import { rentCar } from "controllers/user/rent/rent-car";
import { rentStatus } from "controllers/user/rent/rent-status";
import { rentedCars } from "controllers/user/rent/rented-cars";
import { wishlistCar } from "controllers/user/wishlist/wishlist-car";
import { wishlistedCars } from "controllers/user/wishlist/wishlisted-cars";
import { deleteWishlistedCar } from "controllers/user/wishlist/wishlist-delete";

const router = express.Router();

router.post('/register', register);
router.post("/login", login);
router.post("/verify-registration", verifyRegistration);
router.post("/forgot-password", forgotPassword);
router.post("/verify-updation", verifyUpdation);
router.post("/reset-password", resetPassword);

router.get("/inventory", authentication, inventory);
router.get("/car/:id", authentication, singleCar);

router.post("/rent-car/:id", authentication, rentCar);
router.put("/statusCheck/:id", authentication, rentStatus);
router.get("/rentedCars", authentication, rentedCars);

router.post("/wishlist/:id", authentication, wishlistCar);
router.get("/wishlistedCar", authentication, wishlistedCars);
router.delete("/wishlistedCar/:id", authentication, deleteWishlistedCar)

export default router;
