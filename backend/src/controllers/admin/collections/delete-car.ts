import prisma from "db/db.config";
import express from "express";

interface Admin {
  email: string;
  name: string;
  password: string;
}
interface AdminRequest extends express.Request {
  admin: Admin;
}

 export const deleteCar = async (req: AdminRequest, res: express.Response) => {
   const id = parseInt(req.params.id);
   const admin = await prisma.admin.findUnique({
     where: { email: req.admin.email },
   });
   if (admin) {
     const deletedModel = await prisma.model.delete({
       where: { id: id },
     });
     res.json({ message: "Car deleted", deletedModel });
   }
 };
