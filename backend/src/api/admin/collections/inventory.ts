import prisma from "../../../config/db.config";
import { AdminRequest } from "../../../types";
import { Response } from "express"

export const inventory = async (req: AdminRequest, res: Response) => {
   const cars = await prisma.model.findMany();
   res.json({ success: true, cars: cars });
};
