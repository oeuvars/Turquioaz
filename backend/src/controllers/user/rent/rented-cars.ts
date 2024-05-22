import express from "express";
import prisma from "../../../db/db.config";
import { UserRequest } from "../../../types/UserRequest";

export const rentedCars =  async (req: UserRequest, res: express.Response) => {

   const user = await prisma.user.findUnique({
     where: {
       email: req.user?.email
     },
     include: {
       onRent: {
         where: {
           status: true,
         },
       },
     },
   });
   if (user) {
     res.json({ rentedCars: user.onRent });
   } else {
     res.status(403).json({ message: "User not found" });
   }
 };
