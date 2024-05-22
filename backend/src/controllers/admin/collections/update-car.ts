import prisma from "../../../db/db.config";
import express from "express";
import { AdminRequest } from "../../../types/AdminRequest";

export const updateCar = async (req: AdminRequest, res: express.Response) => {
   const id = parseInt(req.params.id);

   const admin = await prisma.admin.findUnique({
     where: { email: req.admin?.email },
   });
   if (admin) {
     const updatedModel = await prisma.model.update({
       where: { id: id },
       data: {
         carId: parseInt(req.body.carId),
         brand: req.body.brand,
         name: req.body.name,
         power: req.body.power,
         acceleration: req.body.acceleration,
         price: parseInt(req.body.price),
         rent: parseInt(req.body.rentPrice),
         published: req.body.published,
       },
     });

     res.json({ message: "Car Details updated", updatedModel });
   }
 };
