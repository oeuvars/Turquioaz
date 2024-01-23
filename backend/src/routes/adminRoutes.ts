import express from "express";
import { authentication } from "../middleware/adminAuthenticator";
import { login } from "../controllers/admin/auth/login";
import { inventory } from "../controllers/admin/collections/inventory";
import { singleCar } from "../controllers/admin/collections/single-car";
import { addCar } from "../controllers/admin/collections/add-car";
import { updateCar } from "../controllers/admin/collections/update-car";
import { deleteCar } from "../controllers/admin/collections/delete-car";

const router = express.Router();

router.post('/login', login)

router.get("/inventory", authentication, inventory)
router.get("/inventory/:id", authentication, singleCar)

router.post("/add-car", authentication, addCar)
router.put("/update-car/:id", authentication, updateCar)
router.delete("/delete-car/:id", authentication, deleteCar)

export default router;
