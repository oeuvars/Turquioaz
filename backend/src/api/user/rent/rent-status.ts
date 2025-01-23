import { Response } from "express"
import prisma from "../../../config/db.config";
import { UserRequest } from "../../../types";

export const rentStatus = async (req: UserRequest, res: Response) => {
   const id = parseInt(req.params.id);
   const { status } = req.body;
   const targetCar = await prisma.rentedCar.findUnique({
     where: { id: id },
   });
   if (targetCar) {
     const carId = targetCar.id;
     await prisma.rentedCar.update({
       where: { id: carId },
       data: {
         status: status,
       },
     });
     res.json({ message: "Car checked successfully" });
   } else {
     res.status(404).json({ message: "Car not found" });
   }
 };
