"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuthenticator_1 = require("middleware/adminAuthenticator");
const login_1 = require("controllers/admin/auth/login");
const inventory_1 = require("controllers/admin/collections/inventory");
const single_car_1 = require("controllers/admin/collections/single-car");
const add_car_1 = require("controllers/admin/collections/add-car");
const update_car_1 = require("controllers/admin/collections/update-car");
const delete_car_1 = require("controllers/admin/collections/delete-car");
const router = express_1.default.Router();
router.post('/login', login_1.login);
router.get("/inventory", adminAuthenticator_1.authentication, inventory_1.inventory);
router.get("/inventory/:id", adminAuthenticator_1.authentication, single_car_1.singleCar);
router.post("/add-car", adminAuthenticator_1.authentication, add_car_1.addCar);
router.put("/update-car/:id", adminAuthenticator_1.authentication, update_car_1.updateCar);
router.delete("/delete-car/:id", adminAuthenticator_1.authentication, delete_car_1.deleteCar);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map