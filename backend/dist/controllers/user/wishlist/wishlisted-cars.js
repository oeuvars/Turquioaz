"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistedCars = void 0;
const db_config_1 = __importDefault(require("db/db.config"));
const wishlistedCars = async (req, res) => {
    const user = await db_config_1.default.user.findUnique({ where: { email: req.user.email }, include: { onWishlist: true } });
    if (user) {
        res.json({ wishlistedCar: user.onWishlist || [] });
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
};
exports.wishlistedCars = wishlistedCars;
//# sourceMappingURL=wishlisted-cars.js.map