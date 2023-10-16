"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middlewares/auth");
const admins_1 = require("../models/admins");
const cars_1 = require("../models/cars");
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, password } = req.body;
    const admin = yield admins_1.Admin.findOne({ userEmail });
    if (admin) {
        res.status(403).json({ message: "Admin already exists" });
    }
    else {
        const object = { userEmail, password };
        const newAdmin = new admins_1.Admin(object);
        yield newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ userEmail, role: "admin" }, process.env.hiddenKey, {
            expiresIn: "1h",
        });
        res.json({ message: "Admin created successfully", token });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, password } = req.body;
    const admin = yield admins_1.Admin.findOne({ userEmail, password });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ userEmail, role: "admin" }, process.env.hiddenKey, {
            expiresIn: "1h",
        });
        res.json({ message: "Logged in successfully", token });
    }
    else {
        res.status(403).json({ message: "Invalid username or password" });
    }
}));
router.post("/cars", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const car = new cars_1.Cars(req.body);
    yield car.save();
    res.json({
        message: "New Car is listed successfully",
        carId: car.id,
    });
}));
router.put("/cars/:carId", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield cars_1.Cars.findByIdAndUpdate(req.params.carId, req.body, {
        new: true,
    });
    if (car) {
        res.json({ message: "Car details is now updated" });
    }
    else {
        res.status(404).json({ message: "BREAKS!! No car found" });
    }
}));
router.get("/cars", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield cars_1.Cars.find({});
    res.json({ cars });
}));
exports.default = router;
