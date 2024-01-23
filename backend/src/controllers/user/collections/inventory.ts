import express from "express";
import prisma from "../../../db/db.config";

export const inventory = async (req: express.Request, res: express.Response) => {
  try {
    const { page, pageSize, brand, minprice, maxprice, minpower, maxpower, minacceleration, maxacceleration } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string);

    const whereCondition: any = { published: true };
    if (brand) {
      whereCondition.brand = brand;
    }
    if (minprice && maxprice) {
      whereCondition.price = { gte: parseInt(minprice as string), lte: parseInt(maxprice as string) };
    }
    if (minpower && maxpower) {
      whereCondition.power = { gte: parseInt(minpower as string), lte: parseInt(maxpower as string) };
    }
    if (minacceleration && maxacceleration) {
      whereCondition.acceleration = { gte: parseFloat(minacceleration as string), lte: parseFloat(maxacceleration as string) };
    }
    const models = await prisma.model.findMany({
      where: whereCondition,
      skip: skip,
      take: parseInt(pageSize as string),
    });
    const totalModels = await prisma.model.count({where: whereCondition});
    res.json({ models: models, totalModels: totalModels });
  } catch (error) {
    res.json({models: null, totalModels: 0});
  }
};
