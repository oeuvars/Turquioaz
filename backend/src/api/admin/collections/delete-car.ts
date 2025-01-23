import prisma from "../../../../db.config";
import { AdminRequest } from "../../../types";
import { Response } from "express"

 export const deleteCar = async (req: AdminRequest, res: Response) => {
   const id = parseInt(req.params.id);
   const admin = await prisma.admin.findUnique({
     where: { email: req.admin?.email },
   });
   if (admin) {
     const deletedModel = await prisma.model.delete({
       where: { id: id },
     });
     res.json({ message: "Car deleted", deletedModel });
   }
 };
