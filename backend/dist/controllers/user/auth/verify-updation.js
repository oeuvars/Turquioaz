"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUpdation = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const verifyUpdation = async (req, res) => {
    const { email, oneTimePass } = req.body;
    const otp = Number(oneTimePass);
    const user = await db_config_1.default.user.findUnique({ where: { email: email } });
    if (user?.otp === otp) {
        await db_config_1.default.user.update({ where: { email: email }, data: { otp: null, is_verified: true } });
        res.json({ message: "User Verified", verified: true });
    }
    else {
        res.json({ message: "User does not exist", verified: false });
    }
};
exports.verifyUpdation = verifyUpdation;
//# sourceMappingURL=verify-updation.js.map