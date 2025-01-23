import prisma from "../../../../db.config";
import { UserRequest } from "../../../types";
import { Response } from "express"

export const rentedCars =  async (req: UserRequest, res: Response) => {

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
