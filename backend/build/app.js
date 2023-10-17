"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var cors = require("cors");
app.use(cors());
app.use(express_1.default.json());
app.get("/", (req, res) => res.send("this is home page!"));
app.use("/user", userRoutes_1.default);
app.listen(port, () => console.log(`app listening on port ${port}!`));
