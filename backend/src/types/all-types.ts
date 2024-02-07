import { Decimal } from "@prisma/client/runtime/library";

export interface Model {
    id: number;
    brand: string;
    name: string;
    power: number;
    acceleration: Decimal;
    topSpeed: number;
    price: number;
    rent: number;
    published: boolean;
    imageSource: string;
    carId: number;
}
