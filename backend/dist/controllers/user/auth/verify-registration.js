"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRegistration = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const verifyRegistration = async (req, res) => {
    const { email, oneTimePass } = req.body;
    const otp = Number(oneTimePass);
    const user = await db_config_1.default.user.findUnique({ where: { email: email } });
    if (user?.otp === otp) {
        await db_config_1.default.user.update({ where: { email: email }, data: { otp: null, is_verified: true } });
        res.json({ success: true, message: "User Verified" });
    }
    else {
        res.json({ success: false, message: "User does not exist" });
    }
};
exports.verifyRegistration = verifyRegistration;
//# sourceMappingURL=verify-registration.js.map