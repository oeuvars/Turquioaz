"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const db_config_1 = __importDefault(require("db/db.config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const resetPassword = async (req, res) => {
    const { password, email } = req.body;
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt_1.default.hash(password, 7, (err, hash) => {
            if (err)
                reject(err);
            else
                resolve(hash);
        });
    });
    if (hashedPassword) {
        await db_config_1.default.user.update({ where: { email: email }, data: { password: hashedPassword, updated_at: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric" }) } });
        res.json({ message: "Password updated successfully" });
    }
    else {
        res.json({ message: "Could not update password" });
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=reset-password.js.map