import prisma from "../../../db/db.config";
import express from "express";
import { AdminRequest } from "../../../types/AdminRequest";

export const inventory = async (req: AdminRequest, res: express.Response) => {
   const cars = await prisma.model.findMany();
   res.json({ success: true, cars: cars });
};
