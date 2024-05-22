import express from "express";
import prisma from "../../../db/db.config";
import { UserRequest } from "../../../types/UserRequest";

export const wishlistedCars =  async (req: UserRequest, res: express.Response) => {
   const user = await prisma.user.findUnique({where: {email: req.user?.email}, include: {onWishlist: true}});
   if (user) {
     res.json({ wishlistedCar: user.onWishlist || [] });
   } else {
     res.status(403).json({ message: "User not found" });
   }
 };
