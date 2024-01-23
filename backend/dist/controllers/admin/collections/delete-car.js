"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = void 0;
const db_config_1 = __importDefault(require("db/db.config"));
const deleteCar = async (req, res) => {
    const id = parseInt(req.params.id);
    const admin = await db_config_1.default.admin.findUnique({
        where: { email: req.admin.email },
    });
    if (admin) {
        const deletedModel = await db_config_1.default.model.delete({
            where: { id: id },
        });
        res.json({ message: "Car deleted", deletedModel });
    }
};
exports.deleteCar = deleteCar;
//# sourceMappingURL=delete-car.js.map