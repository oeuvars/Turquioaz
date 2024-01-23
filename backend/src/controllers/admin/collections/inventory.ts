import prisma from "../../../db/db.config";
import express from "express";

export const inventory = async (req: express.Request, res: express.Response) => {
   const cars = await prisma.model.findMany();
   res.json({ cars });
};
