import prisma from "../../../config/db.config";
import { Request, Response } from "express"

export const singleCar = async (req: Request, res: Response) => {
   const id = parseInt(req.params.id);
   const car = await prisma.model.findUnique({
     where: { id: id },
   });
   res.json({ car });
 };
