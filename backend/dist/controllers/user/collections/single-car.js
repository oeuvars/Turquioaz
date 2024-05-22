"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleCar = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const singleCar = async (req, res) => {
    const id = parseInt(req.params.id);
    const model = await db_config_1.default.model.findUnique({ where: { id: id } });
    try {
        res.json({ success: true, model: model });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, model: null });
    }
};
exports.singleCar = singleCar;
//# sourceMappingURL=single-car.js.map