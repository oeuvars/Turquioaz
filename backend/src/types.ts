import { Decimal } from "@prisma/client/runtime/library";
import { Admin, User } from '@prisma/client';
import { Request } from "express";

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

export interface AdminRequest extends Request {
    admin?: Admin;
}

export interface UserRequest extends Request {
    user?: User;
}
