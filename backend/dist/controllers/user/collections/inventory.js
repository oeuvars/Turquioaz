"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventory = void 0;
const db_config_1 = __importDefault(require("db/db.config"));
const inventory = async (req, res) => {
    try {
        const { page, pageSize, brand, minprice, maxprice, minpower, maxpower, minacceleration, maxacceleration } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(pageSize);
        const whereCondition = { published: true };
        if (brand) {
            whereCondition.brand = brand;
        }
        if (minprice && maxprice) {
            whereCondition.price = { gte: parseInt(minprice), lte: parseInt(maxprice) };
        }
        if (minpower && maxpower) {
            whereCondition.power = { gte: parseInt(minpower), lte: parseInt(maxpower) };
        }
        if (minacceleration && maxacceleration) {
            whereCondition.acceleration = { gte: parseFloat(minacceleration), lte: parseFloat(maxacceleration) };
        }
        const models = await db_config_1.default.model.findMany({
            where: whereCondition,
            skip: skip,
            take: parseInt(pageSize),
        });
        const totalModels = await db_config_1.default.model.count({ where: whereCondition });
        res.json({ models: models, totalModels: totalModels });
    }
    catch (error) {
        res.json({ models: null, totalModels: 0 });
    }
};
exports.inventory = inventory;
//# sourceMappingURL=inventory.js.map