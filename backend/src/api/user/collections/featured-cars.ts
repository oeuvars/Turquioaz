import { Request, Response } from "express"
import prisma from "../../../../db.config";
import { shuffleCars } from "../../../helpers/shuffle-cars";

let lastShuffleTime: Date | null = null;
let shuffledModels: any[] | null = null;

export const featuredCars = async (req: Request, res: Response) => {
  try {
    const currentTime = new Date();
    if (!lastShuffleTime || !shuffledModels || daysBetween(lastShuffleTime, currentTime) >= 1) {
      const allModels = await prisma.model.findMany({ where: { published: true } });
      shuffledModels = shuffleCars(allModels);
      lastShuffleTime = currentTime;
    }
    const selectedModels = shuffledModels.slice(0, 7);
    res.json({ success: true, total: selectedModels.length, models: selectedModels });
  } catch (error) {
    res.json({ success: false, total: null, models: null });
  }
};

function daysBetween(date1: Date, date2: Date) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
}
