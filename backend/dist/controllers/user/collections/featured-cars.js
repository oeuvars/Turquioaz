"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.featuredCars = void 0;
const db_config_1 = __importDefault(require("db/db.config"));
let lastShuffleTime = null;
let shuffledModels = null;
const featuredCars = async (req, res) => {
    try {
        const currentTime = new Date();
        if (!lastShuffleTime || !shuffledModels || daysBetween(lastShuffleTime, currentTime) >= 1) {
            const allModels = await db_config_1.default.model.findMany({ where: { published: true } });
            shuffledModels = shuffleArray(allModels);
            lastShuffleTime = currentTime;
        }
        const selectedModels = shuffledModels.slice(0, 6);
        res.json({ total: selectedModels.length, models: selectedModels });
    }
    catch (error) {
        res.json({ total: null, models: null });
    }
};
exports.featuredCars = featuredCars;
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
//# sourceMappingURL=featured-cars.js.map