"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToWishlist = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const AddToWishlist = async (req, res) => {
    const id = parseInt(req.params.id);
    const car = await db_config_1.default.model.findUnique({ where: { id: id } });
    console.log(car);
    if (car) {
        const user = await db_config_1.default.user.findUnique({ where: { email: req.user?.email } });
        if (user) {
            const userID = user.id;
            const carID = car.id;
            await db_config_1.default.wishlistedCar.create({ data: { wishlistedbyId: userID, carId: carID } });
            res.json({ message: "Ride is in your wishlist" });
        }
        else {
            res.status(403).json({ message: "User not found" });
        }
    }
    else {
        res.status(404).json({ message: "Car not found" });
    }
};
exports.AddToWishlist = AddToWishlist;
//# sourceMappingURL=add-to-wishlist.js.map