"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, admin) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.admin = admin;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authentication = authentication;
//# sourceMappingURL=adminAuthenticator.js.map
