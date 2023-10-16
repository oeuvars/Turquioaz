"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require("dotenv/config");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var cors = require("cors");
app.use(cors());
app.use(express_1.default.json());
app.get("/", (req, res) => res.send("this is home page!"));
app.use("/user", userRoutes_1.default);
app.listen(5000, () => {
    console.log("server has started on port 5000");
});
