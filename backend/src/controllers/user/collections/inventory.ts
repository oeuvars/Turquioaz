import express from "express";
import prisma from "db/db.config";

export const inventory = async (req: express.Request, res: express.Response) => {
   const models = await prisma.model.findMany({where: { published: true }});
   res.json({ models });
 };
