"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventory = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const shuffleCars_1 = require("../../../helpers/shuffleCars");
const inventory = async (req, res) => {
    try {
        const { page, pageSize, brand, minprice, maxprice, minpower, maxpower, minacceleration, maxacceleration } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(pageSize);
        const filters = { published: true };
        if (brand) {
            filters.brand = brand;
        }
        if (minprice && maxprice) {
            filters.price = { gte: parseInt(minprice), lte: parseInt(maxprice) };
        }
        if (minpower && maxpower) {
            filters.power = { gte: parseInt(minpower), lte: parseInt(maxpower) };
        }
        if (minacceleration && maxacceleration) {
            filters.acceleration = { gte: parseFloat(minacceleration), lte: parseFloat(maxacceleration) };
        }
        const allModels = await db_config_1.default.model.findMany({
            where: filters,
            skip: skip,
            take: parseInt(pageSize),
        });
        const totalModels = await db_config_1.default.model.count({ where: filters });
        res.json({ models: (0, shuffleCars_1.shuffleCars)(allModels), totalModels: totalModels });
    }
    catch (error) {
        res.json({ models: null, totalModels: 0 });
    }
};
exports.inventory = inventory;
//# sourceMappingURL=inventory.js.map