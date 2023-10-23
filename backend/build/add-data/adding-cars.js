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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const car = yield prisma.cars.createMany({
            data: [
                {
                    brand: "Toyota",
                    id: 1,
                },
                {
                    brand: "Honda",
                    id: 2,
                },
                {
                    brand: "Ford",
                    id: 3,
                },
                {
                    brand: "Chevrolet",
                    id: 4,
                },
                {
                    brand: "Volkswagen",
                    id: 5,
                },
                {
                    brand: "BMW",
                    id: 6,
                },
                {
                    brand: "Mercedes-Benz",
                    id: 7,
                },
                {
                    brand: "Audi",
                    id: 8,
                },
                {
                    brand: "Lexus",
                    id: 9,
                },
                {
                    brand: "Nissan",
                    id: 10,
                },
                {
                    brand: "Mazda",
                    id: 11,
                },
                {
                    brand: "Hyundai",
                    id: 12,
                },
                {
                    brand: "Kia",
                    id: 13,
                },
                {
                    brand: "Subaru",
                    id: 14,
                },
                {
                    brand: "Jeep",
                    id: 15,
                },
                {
                    brand: "Volvo",
                    id: 16,
                },
                {
                    brand: "Porsche",
                    id: 17,
                },
                {
                    brand: "Tesla",
                    id: 18,
                },
                {
                    brand: "Ferrari",
                    id: 19,
                },
                {
                    brand: "Lamborghini",
                    id: 20,
                },
            ],
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("done");
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
