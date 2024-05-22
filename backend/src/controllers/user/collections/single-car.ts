import express from "express";
import prisma from "../../../db/db.config";

export const singleCar = async (req: express.Request, res: express.Response) => {
   const id = parseInt(req.params.id);
   const model = await prisma.model.findUnique({where: { id: id }});
   try {
     res.json({ success: true, model: model });
   } catch (error) {
    console.log(error)
     res.json({ success: false, model: null });
   }
 };
