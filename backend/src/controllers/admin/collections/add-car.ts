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

export const addCar = async (req: RequestWithUser, res: express.Response) => {
   const admin = await prisma.admin.findUnique({
     where: { adminMail: req.user.email },
   });
   if (admin) {
     const newModel = await prisma.model.create({
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

     res.json({ message: "New Car Added", newModel });
   } else {
     res.status(403).json({ message: "Admin not found" });
   }
 };
