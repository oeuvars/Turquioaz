import express from "express";
import prisma from "db/db.config";

interface User {
   email: string;
   name: string;
   password: string;
   is_Verified: boolean;
 }
 interface RequestWithUser extends express.Request {
   user: User;
 }

export const wishlistedCars =  async (req: RequestWithUser, res: express.Response) => {
   const user = await prisma.user.findUnique({where: {email: req.user.email}, include: {onWishlist: true}});
   if (user) {
     res.json({ wishlistedCar: user.onWishlist || [] });
   } else {
     res.status(403).json({ message: "User not found" });
   }
 };
