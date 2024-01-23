import express from "express";
import prisma from "db/db.config";

let lastShuffleTime: Date | null = null;
let shuffledModels: any[] | null = null;

export const featuredCars = async (req: express.Request, res: express.Response) => {
  try {
    const currentTime = new Date();
    if (!lastShuffleTime || !shuffledModels || daysBetween(lastShuffleTime, currentTime) >= 1) {
      const allModels = await prisma.model.findMany({ where: { published: true } });
      shuffledModels = shuffleArray(allModels);
      lastShuffleTime = currentTime;
    }
    const selectedModels = shuffledModels.slice(0, 6);
    res.json({ total: selectedModels.length, models: selectedModels });
  } catch (error) {
    res.json({ total: null, models: null });
  }
};

function daysBetween(date1: Date, date2: Date) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
