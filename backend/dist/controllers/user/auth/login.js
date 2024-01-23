"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_config_1 = __importDefault(require("../../../db/db.config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await db_config_1.default.user.findUnique({ where: { email: email } });
    if (!user || user.is_verified === false) {
        res.json({ exists: false, sucess: false, message: "User not verified or don't exist", token: null });
    }
    else {
        const passwordCheck = await new Promise((resolve, reject) => {
            bcrypt_1.default.compare(password, user.password, async (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
        if (passwordCheck === true) {
            const loginToken = jsonwebtoken_1.default.sign({ email: email, name: user.name }, process.env.hiddenKey, { expiresIn: "7d" });
            await db_config_1.default.user.update({ where: { email: email }, data: { last_login: new Date().toLocaleDateString() } });
            res.json({ exists: true, success: true, message: "Logged in successfully", token: loginToken });
        }
        else {
            res.json({ exists: true, success: false, message: "Incorrect Password", token: null });
        }
    }
};
exports.login = login;
//# sourceMappingURL=login.js.map