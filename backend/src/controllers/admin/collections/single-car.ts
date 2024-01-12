import express from "express";
import prisma from "db/db.config";

export const singleCar = async (req: express.Request, res: express.Response) => {
   const id = parseInt(req.params.id);
   const car = await prisma.model.findUnique({
     where: { id: id },
   });
   res.json({ car });
 };
