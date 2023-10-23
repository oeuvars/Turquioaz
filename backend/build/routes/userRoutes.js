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
const sendMail_1 = require("../helper/sendMail");
const auth_1 = require("../middlewares/auth");
const db_config_1 = __importDefault(require("../DB/db.config"));
//USER SIGNUP
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield db_config_1.default.user.findUnique({ where: { email: email } });
    if (user) {
        res.status(403).json({ message: "User already exists" });
    }
    else {
        const newUser = yield db_config_1.default.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            },
        });
        const token = jsonwebtoken_1.default.sign({ email, role: "user", name }, process.env.hiddenKey, {
            expiresIn: "1h",
        });
        res.json({ message: "User created successfully", token });
    }
}));
//USER LOGIN
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_config_1.default.user.findUnique({
        where: {
            email: email,
            password: password,
        },
    });
    if (user) {
        const name = user.name;
        const token = jsonwebtoken_1.default.sign({ email, role: "user", name }, process.env.hiddenKey, {
            expiresIn: "24h",
        });
        res.json({ message: "Logged in successfully", token });
    }
    else {
        res.status(403).json({ message: "Invalid email or password" });
    }
}));
router.post("/forgotPassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield db_config_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    if (user) {
        const secret = process.env.hiddenKey + user.password;
        const payload = {
            email: user.email,
            id: user.id,
        };
        const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "15m" });
        const content = `${user.id}/${token}`;
        //sendMail(email, "Reset Password", link);
        res.send((0, sendMail_1.sendMail)(email, "Reset Password", content));
        //res.status(200).json({ message: "reset link sent" });
    }
    else {
        res.status(402).json({ message: "User doesnt reside in our database" });
    }
}));
router.post("/resetPassword/:id/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;
    const user = yield db_config_1.default.user.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    if (user) {
        const secret = process.env.hiddenKey + user.password;
        try {
            const payload = jsonwebtoken_1.default.verify(token, secret);
            if (password === confirmPassword) {
                yield db_config_1.default.user.update({
                    where: {
                        id: parseInt(id),
                    },
                    data: {
                        password: password,
                    },
                });
                res.send("password updated successfully");
            }
            else {
                res.send("passwords do not match");
            }
        }
        catch (error) {
            res.status(404).json(error);
        }
    }
}));
//GET ALL MODELS
router.get("/inventory", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const models = yield db_config_1.default.model.findMany({
        where: { published: true },
    });
    res.json({ models });
}));
// GET BY BRANDS
router.get("/cars/brands/:id", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const car = yield db_config_1.default.cars.findMany({
        where: { id: id },
    });
    try {
        res.json({ car });
    }
    catch (error) {
        res.json({ error });
    }
}));
//GET A SINGLE CAR
router.get("/car/:id", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const model = yield db_config_1.default.model.findUnique({
        where: { id: id },
    });
    try {
        res.json({ model });
    }
    catch (error) {
        res.json({ error });
    }
}));
// RENT A CAR
router.post("/rent-car/:id", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, status } = req.body;
    const id = parseInt(req.params.id);
    const car = yield db_config_1.default.model.findUnique({
        where: {
            id: id,
        },
    });
    console.log(car);
    if (car) {
        const user = yield db_config_1.default.user.findUnique({
            where: {
                email: req.user.email,
            },
        });
        if (user) {
            const carID = car.id;
            const userID = user.id;
            const rentedCar = yield db_config_1.default.rentedCar.create({
                data: {
                    carId: carID,
                    rentedtoId: userID,
                    startDate: startDate,
                    endDate: endDate,
                    status: status,
                },
            });
            const rentedCarID = rentedCar.id;
            const token = jsonwebtoken_1.default.sign({ id: rentedCarID }, process.env.hiddenKey, {
                expiresIn: "24h",
            });
            res.json({ message: "Car Rented successfully", token });
        }
        else {
            res.status(403).json({ message: "User not found" });
        }
    }
    else {
        res.status(404).json({ message: "Car not found" });
    }
}));
// UPDATING STATUS FOR CHECKING
router.put("/statusCheck/:id", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const targetCar = yield db_config_1.default.rentedCar.findUnique({
        where: { id: id },
    });
    if (targetCar) {
        const carId = targetCar.id;
        yield db_config_1.default.rentedCar.update({
            where: { id: carId },
            data: {
                status: status,
            },
        });
        res.json({ message: "Car checked successfully" });
    }
    else {
        res.status(404).json({ message: "Car not found" });
    }
}));
// GET RENTED CARS
router.get("/rentedCars", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_config_1.default.user.findUnique({
        where: {
            email: req.user.email,
        },
        include: {
            onRent: {
                where: {
                    status: true,
                },
            },
        },
    });
    if (user) {
        res.json({ rentedCars: user.onRent });
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
}));
//PUT IT IN WISHLIST
router.post("/wishlist/:id", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const car = yield db_config_1.default.model.findUnique({ where: { id: id } });
    console.log(car);
    if (car) {
        const user = yield db_config_1.default.user.findUnique({
            where: {
                email: req.user.email,
            },
        });
        if (user) {
            const userID = user.id;
            const carID = car.id;
            yield db_config_1.default.wishlistedCar.create({
                data: {
                    wishlistedbyId: userID,
                    carId: carID,
                },
            });
            //await user.save();
            res.json({ message: "Ride is in your wishlist" });
        }
        else {
            res.status(403).json({ message: "User not found" });
        }
    }
    else {
        res.status(404).json({ message: "Car not found" });
    }
}));
//GET WISHLISTED CARS
router.get("/wishlistedCar", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_config_1.default.user.findUnique({
        where: {
            email: req.user.email,
        },
        include: {
            onWishlist: true,
        },
    });
    if (user) {
        res.json({ wishlistedCar: user.onWishlist || [] });
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
}));
//REMOVE IT FROM WISHLIST
router.delete("/wishlistedCar/:id", auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wishCar = yield db_config_1.default.wishlistedCar.findUnique({
        where: { id: parseInt(req.params.id) },
    });
    console.log(wishCar);
    if (wishCar) {
        const user = yield db_config_1.default.user.findUnique({
            where: { email: req.user.email },
            include: {
                onWishlist: true,
            },
        });
        if (user) {
            const wishCarId = wishCar.id;
            yield db_config_1.default.wishlistedCar.delete({
                where: {
                    id: wishCarId,
                },
            });
            res.json({
                message: "Car removed from wishlist",
            });
        }
        else {
            res.status(403).json({ message: "User Not found" });
        }
    }
    else {
        res.status(404).json({ message: "Car Not Found" });
    }
}));
exports.default = router;
