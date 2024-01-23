"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentStatus = void 0;
const db_config_1 = __importDefault(require("db/db.config"));
const rentStatus = async (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const targetCar = await db_config_1.default.rentedCar.findUnique({
        where: { id: id },
    });
    if (targetCar) {
        const carId = targetCar.id;
        await db_config_1.default.rentedCar.update({
            where: { id: carId },
            data: {
                status: status,
            },
        });
        res.json({ message: "Car checked successfully" });
    }
    else {
        res.status(404).json({ message: "Car not found" });
    }
};
exports.rentStatus = rentStatus;
//# sourceMappingURL=rent-status.js.map