import express from "express";
import prisma from "../../../config/db.config";
import { UserRequest } from "../../../types";
import { Response } from "express"

export const deleteFromWishlist = async (req: UserRequest, res: Response) => {
  console.log("lol")
  console.log(req.params.id)
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
