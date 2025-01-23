import prisma from "../../../../db.config";
import { AdminRequest } from "../../../types";
import { Response } from "express"

export const addCar = async (req: AdminRequest, res: Response) => {
   const admin = await prisma.admin.findUnique({where: { email: req.admin?.email }});
   if (admin) {
     const newModel = await prisma.model.create({
       data: {
         carId: parseInt(req.body.carId),
         brand: req.body.brand,
         name: req.body.name,
         power: req.body.power,
         acceleration: req.body.acceleration,
         topSpeed: req.body.topSpeed,
         price: parseInt(req.body.price),
         rent: parseInt(req.body.rent),
         imageSource: req.body.src,
         published: req.body.published,
       },
     });

     res.json({ message: "New Car Added", newModel });
   } else {
     res.status(403).json({ message: "Admin not found" });
   }
 };
