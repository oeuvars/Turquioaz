import express from 'express';
import prisma from '../../../db/db.config';

export const totalCars = async (req: express.Request, res: express.Response) => {
    try {
        const totalModels = await prisma.model.count({ where: { published: true } });
        const allModels = await prisma.model.findMany({ where: { published: true } });
        const brands: string[] = allModels.map(model => model.brand);
        res.json({ success: true, total: totalModels, brands: brands });
    } catch (error) {
        res.json({ success: false, total: null, models: null });
    }
};
