"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishlist = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const getWishlist = async (req, res) => {
    try {
        const wishlist = await db_config_1.default.user.findUnique({
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
        if (wishlist) {
            res.json({ success: true, wishlist: wishlist.onWishlist });
        }
        else {
            res.status(403).json({ success: false, wishlist: null });
        }
    }
    catch (error) {
        console.error('Error fetching wishlisted cars:', error);
        res.status(500).json({ success: false, wishlist: null });
    }
};
exports.getWishlist = getWishlist;
//# sourceMappingURL=get-wishtlist.js.map