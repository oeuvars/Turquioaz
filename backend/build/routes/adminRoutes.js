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
const db_config_1 = __importDefault(require("../DB/db.config"));
// SIGN UP FOR NEW USER
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const admin = yield db_config_1.default.admin.findUnique({
        where: { adminMail: email },
    });
    if (admin) {
        res.status(403).json({ message: "Admin already exists" });
    }
    else {
        const newAdmin = yield db_config_1.default.admin.create({
            data: {
                name: name,
                adminMail: email,
                password: password,
            },
        });
        const token = jsonwebtoken_1.default.sign({ email, role: "admin", name }, process.env.hiddenKey, {
            expiresIn: "24h",
        });
        res.json({ message: "Admin created successfully", token });
    }
}));
// ADMIN LOGIN
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const admin = yield db_config_1.default.admin.findUnique({
        where: {
            adminMail: email,
            password: password,
        },
    });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ email, role: "admin" }, process.env.hiddenKey, {
            expiresIn: "24h",
        });
        res.json({ message: "Logged in successfully", token });
    }
    else {
        res.status(403).json({ message: "Invalid email or password" });
    }
}));
// ADMIN GET ALL CARS
router.get("/inventory", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield db_config_1.default.model.findMany();
    res.json({ cars });
}));
// ADMIN GET SINGLE CAR
router.get("/inventory/:id", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield db_config_1.default.model.findUnique({
        where: { id: Number(req.params.id) },
    });
    res.json({ car });
}));
// ADMIN ADD CARS
router.post("/inventory/addCar", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield db_config_1.default.admin.findUnique({
        where: { adminMail: req.user.email },
    });
    if (admin) {
        const newModel = yield db_config_1.default.model.create({
            data: {
                carId: parseInt(req.body.carId),
                name: req.body.name,
                transmission: req.body.transmission,
                fuelType: req.body.fuelType,
                seatNumbers: parseInt(req.body.seatNumbers),
                condition: req.body.condition,
                price: parseInt(req.body.price),
                rentPrice: parseInt(req.body.rentPrice),
                published: req.body.published,
            },
        });
        res.json({ message: "New Car Added", newModel });
    }
    else {
        res.status(403).json({ message: "Admin not found" });
    }
}));
// ADMIN UPDATE CARS
router.put("/inventory/:id", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const admin = yield db_config_1.default.admin.findUnique({
        where: { adminMail: req.user.email },
    });
    if (admin) {
        const updatedModel = yield db_config_1.default.model.update({
            where: { id: id },
            data: {
                carId: parseInt(req.body.carId),
                name: req.body.name,
                transmission: req.body.transmission,
                fuelType: req.body.fuelType,
                seatNumbers: parseInt(req.body.seatNumbers),
                condition: req.body.condition,
                price: parseInt(req.body.price),
                rentPrice: parseInt(req.body.rentPrice),
                published: req.body.published,
            },
        });
        res.json({ message: "Car Details updated", updatedModel });
    }
}));
// ADMIN DELETE CARS
router.delete("/inventory/:id", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const admin = yield db_config_1.default.admin.findUnique({
        where: { adminMail: req.user.email },
    });
    if (admin) {
        const deletedModel = yield db_config_1.default.model.delete({
            where: { id: id },
        });
        res.json({ message: "Car deleted", deletedModel });
    }
}));
exports.default = router;
