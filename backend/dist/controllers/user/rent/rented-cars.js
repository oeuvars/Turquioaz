"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentedCars = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const rentedCars = async (req, res) => {
    const user = await db_config_1.default.user.findUnique({
        where: {
            email: req.user?.email
        },
        include: {
            onRent: {
                where: {
                    status: true,
                },
            },
        },
    });
    if (user) {
        res.json({ rentedCars: user.onRent });
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
};
exports.rentedCars = rentedCars;
//# sourceMappingURL=rented-cars.js.map