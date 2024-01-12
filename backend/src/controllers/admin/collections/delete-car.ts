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

 export const deleteCar = async (req: RequestWithUser, res: express.Response) => {
   const id = parseInt(req.params.id);
   const admin = await prisma.admin.findUnique({
     where: { email: req.user.email },
   });
   if (admin) {
     const deletedModel = await prisma.model.delete({
       where: { id: id },
     });
     res.json({ message: "Car deleted", deletedModel });
   }
 };
