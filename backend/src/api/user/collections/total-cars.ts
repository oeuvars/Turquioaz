import { Request, Response } from "express"
import prisma from '../../../../db.config';

export const totalCars = async (req: Request, res: Response) => {
    try {
        const totalModels = await prisma.model.count({ where: { published: true } });
        const allModels = await prisma.model.findMany({ where: { published: true } });
        const brands: string[] = allModels.map(model => model.brand);
        res.json({ success: true, total: totalModels, brands: brands });
    } catch (error) {
        res.json({ success: false, total: null, models: null });
    }
};
