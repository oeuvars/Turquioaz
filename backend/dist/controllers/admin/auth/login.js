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
    const user = await db_config_1.default.admin.findUnique({ where: { email: email } });
    if (!user) {
        return res.status(401).json({ message: 'Admins only' });
    }
    const passwordCheck = await new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, user.password, async (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
    });
    if (passwordCheck === true) {
        const loginToken = jsonwebtoken_1.default.sign({ email, role: "admin" }, process.env.hiddenKey, { expiresIn: "24h" });
        await db_config_1.default.admin.update({ where: { email: email }, data: { last_login: new Date().toLocaleDateString() } });
        res.json({ message: "Logged in successfully", token: loginToken });
    }
    else {
        res.json({ message: "Incorrect Password", token: null });
    }
};
exports.login = login;
//# sourceMappingURL=login.js.map