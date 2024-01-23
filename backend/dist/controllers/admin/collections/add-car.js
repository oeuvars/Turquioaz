"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCar = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const addCar = async (req, res) => {
    const admin = await db_config_1.default.admin.findUnique({ where: { email: req.admin.email } });
    if (admin) {
        const newModel = await db_config_1.default.model.create({
            data: {
                carId: parseInt(req.body.carId),
                brand: req.body.brand,
                name: req.body.name,
                power: req.body.power,
                acceleration: req.body.acceleration,
                topSpeed: req.body.topSpeed,
                price: parseInt(req.body.price),
                rent: parseInt(req.body.rent),
                imageSource: req.body.src,
                published: req.body.published,
            },
        });
        res.json({ message: "New Car Added", newModel });
    }
    else {
        res.status(403).json({ message: "Admin not found" });
    }
};
exports.addCar = addCar;
//# sourceMappingURL=add-car.js.map