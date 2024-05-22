import express from "express";
import prisma from "../../../db/db.config";
import { UserRequest } from "../../../types/UserRequest";

export const wishlistCar = async (req: UserRequest, res: express.Response) => {
   const id = parseInt(req.params.id);
   const car = await prisma.model.findUnique({ where: { id: id } });
   if (car) {
     const user = await prisma.user.findUnique({where: {email: req.user?.email}});
     if (user) {
       const userID = user.id;
       const carID = car.id;
       await prisma.wishlistedCar.create({data: {wishlistedbyId: userID,carId: carID}});
       res.json({ message: "Ride is in your wishlist" });
     } else {
       res.status(403).json({ message: "User not found" });
     }
   } else {
     res.status(404).json({ message: "Car not found" });
   }
 };
