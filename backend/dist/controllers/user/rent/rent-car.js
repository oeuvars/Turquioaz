"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentCar = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_config_1 = __importDefault(require("../../../db/db.config"));
const rentCar = async (req, res) => {
    if (!req.user) {
        return res.json({ success: false, message: 'User not found', token: null });
    }
    const { startDate, endDate, status } = req.body;
    const id = parseInt(req.params.id);
    const car = await db_config_1.default.model.findUnique({ where: { id: id } });
    if (car) {
        const user = await db_config_1.default.user.findUnique({ where: { email: req.user.email } });
        if (user) {
            const carID = car.id;
            const userID = user.id;
            const rentedCar = await db_config_1.default.rentedCar.create({
                data: {
                    carId: carID,
                    rentedtoId: userID,
                    startDate: startDate,
                    endDate: endDate,
                    status: status,
                },
            });
            const rentedCarID = rentedCar.id;
            const token = jsonwebtoken_1.default.sign({ id: rentedCarID }, process.env.JWT_SECRET, {
                expiresIn: '24h',
            });
            res.json({ success: true, message: 'Car Rented successfully', token: token });
        }
        else {
            res.status(403).json({ success: false, message: 'User not found', token: null });
        }
    }
    else {
        res.status(404).json({ success: false, message: 'Car not found', token: null });
    }
};
exports.rentCar = rentCar;
//# sourceMappingURL=rent-car.js.map
