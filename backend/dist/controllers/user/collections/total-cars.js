"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalCars = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const totalCars = async (req, res) => {
    try {
        const totalModels = await db_config_1.default.model.count({ where: { published: true } });
        const allModels = await db_config_1.default.model.findMany({ where: { published: true } });
        const brands = allModels.map(model => model.brand);
        res.json({ success: true, total: totalModels, brands: brands });
    }
    catch (error) {
        res.json({ success: false, total: null, models: null });
    }
};
exports.totalCars = totalCars;
//# sourceMappingURL=total-cars.js.map