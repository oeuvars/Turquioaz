import express from "express";
import prisma from "../../../db/db.config";
import { UserRequest } from "../../../types/UserRequest";

export const deleteWishlistedCar = async (req: UserRequest, res: express.Response) => {
   const wishCar = await prisma.wishlistedCar.findUnique({
     where: { id: parseInt(req.params.id) },
   });
   if (wishCar) {
     const user = await prisma.user.findUnique({where: { email: req.user?.email }, include: {onWishlist: true}});
     if (user) {
       const wishCarId = wishCar.id;
       await prisma.wishlistedCar.delete({where: {id: wishCarId}});
       res.json({message: "Car removed from wishlist"});
     } else {
       res.status(403).json({ message: "User Not found" });
     }
   } else {
     res.status(404).json({ message: "Car Not Found" });
   }
 };
