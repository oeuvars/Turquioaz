import express from "express";
import prisma from "db/db.config";

export const rentStatus = async (req: express.Request, res: express.Response) => {
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
