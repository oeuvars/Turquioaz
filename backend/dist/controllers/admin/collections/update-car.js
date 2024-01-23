"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCar = void 0;
const db_config_1 = __importDefault(require("db/db.config"));
const updateCar = async (req, res) => {
    const id = parseInt(req.params.id);
    const admin = await db_config_1.default.admin.findUnique({
        where: { email: req.admin.email },
    });
    if (admin) {
        const updatedModel = await db_config_1.default.model.update({
            where: { id: id },
            data: {
                carId: parseInt(req.body.carId),
                brand: req.body.brand,
                name: req.body.name,
                power: req.body.power,
                acceleration: req.body.acceleration,
                price: parseInt(req.body.price),
                rent: parseInt(req.body.rentPrice),
                published: req.body.published,
            },
        });
        res.json({ message: "Car Details updated", updatedModel });
    }
};
exports.updateCar = updateCar;
//# sourceMappingURL=update-car.js.map