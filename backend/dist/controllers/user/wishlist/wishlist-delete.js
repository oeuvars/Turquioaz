"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishlistedCar = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const deleteWishlistedCar = async (req, res) => {
    const wishCar = await db_config_1.default.wishlistedCar.findUnique({
        where: { id: parseInt(req.params.id) },
    });
    console.log(wishCar);
    if (wishCar) {
        const user = await db_config_1.default.user.findUnique({ where: { email: req.user.email }, include: { onWishlist: true } });
        if (user) {
            const wishCarId = wishCar.id;
            await db_config_1.default.wishlistedCar.delete({ where: { id: wishCarId } });
            res.json({ message: "Car removed from wishlist" });
        }
        else {
            res.status(403).json({ message: "User Not found" });
        }
    }
    else {
        res.status(404).json({ message: "Car Not Found" });
    }
};
exports.deleteWishlistedCar = deleteWishlistedCar;
//# sourceMappingURL=wishlist-delete.js.map