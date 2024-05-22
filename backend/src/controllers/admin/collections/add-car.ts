import prisma from "../../../db/db.config";
import express from "express";
import { AdminRequest } from "../../../types/AdminRequest";

export const addCar = async (req: AdminRequest, res: express.Response) => {
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
