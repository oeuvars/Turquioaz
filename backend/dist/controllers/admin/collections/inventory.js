"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventory = void 0;
const db_config_1 = __importDefault(require("db/db.config"));
const inventory = async (req, res) => {
    const cars = await db_config_1.default.model.findMany();
    res.json({ cars });
};
exports.inventory = inventory;
//# sourceMappingURL=inventory.js.map