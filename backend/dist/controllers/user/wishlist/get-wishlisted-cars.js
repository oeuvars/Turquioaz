"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishlistedCars = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const getWishlistedCars = async (req, res) => {
    try {
        const user = await db_config_1.default.user.findUnique({
            where: {
                email: req.user?.email
            },
            include: {
                onWishlist: {
                    include: {
                        car: true,
                    },
                },
            },
        });
        if (user) {
            const wishlistedCars = user.onWishlist.map(item => item.car);
            res.json({ success: true, wishlistedCars: wishlistedCars });
        }
        else {
            res.status(403).json({ success: false, wishlistedCars: null });
        }
    }
    catch (error) {
        console.error('Error fetching wishlisted cars:', error);
        res.status(500).json({ success: false, wishlistedCars: null });
    }
};
exports.getWishlistedCars = getWishlistedCars;
//# sourceMappingURL=get-wishlisted-cars.js.map