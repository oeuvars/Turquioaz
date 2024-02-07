import express from "express";
import prisma from "../../../db/db.config";
import { shuffleCars } from "../../../helpers/shuffleCars";

export const inventory = async (req: express.Request, res: express.Response) => {
  try {
    const { page, pageSize, brand, minprice, maxprice, minpower, maxpower, minacceleration, maxacceleration } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string);

    const filters: any = { published: true };
    if (brand) {
      filters.brand = brand;
    }
    if (minprice && maxprice) {
      filters.price = { gte: parseInt(minprice as string), lte: parseInt(maxprice as string) };
    }
    if (minpower && maxpower) {
      filters.power = { gte: parseInt(minpower as string), lte: parseInt(maxpower as string) };
    }
    if (minacceleration && maxacceleration) {
      filters.acceleration = { gte: parseFloat(minacceleration as string), lte: parseFloat(maxacceleration as string) };
    }
    const allModels = await prisma.model.findMany({
      where: filters,
      skip: skip,
      take: parseInt(pageSize as string),
    });
    const totalModels = await prisma.model.count({where: filters});
    res.json({ models: shuffleCars(allModels), totalModels: totalModels });
  } catch (error) {
    res.json({models: null, totalModels: 0});
  }
};
