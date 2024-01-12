import prisma from "db/db.config";
import express from "express";

interface User {
   email: string;
   name: string;
   password: string;
   is_Verified: boolean;
 }
 interface RequestWithUser extends express.Request {
   user: User;
 }

export const updateCar = async (req: RequestWithUser, res: express.Response) => {
   const id = parseInt(req.params.id);

   const admin = await prisma.admin.findUnique({
     where: { email: req.user.email },
   });
   if (admin) {
     const updatedModel = await prisma.model.update({
       where: { id: id },
       data: {
         carId: parseInt(req.body.carId),
         brand: req.body.brand,
         name: req.body.name,
         transmission: req.body.transmission,
         fuelType: req.body.fuelType,
         seatNumbers: parseInt(req.body.seatNumbers),
         price: parseInt(req.body.price),
         rent: parseInt(req.body.rentPrice),
         published: req.body.published,
       },
     });

     res.json({ message: "Car Details updated", updatedModel });
   }
 };
