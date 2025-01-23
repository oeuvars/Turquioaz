import prisma from '../../../../db.config';
import { UserRequest } from '../../../types';
import { Response } from "express"

export const getWishlistedCars = async (req: UserRequest, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.user?.email
            },
            include: {
                onWishlist: {
                    include: {
                        car: true,
                    },
                },
            },
        });

        if (user) {
            const wishlistedCars = user.onWishlist.map(item => item.car);
            res.json({ success: true, wishlistedCars: wishlistedCars });
        } else {
            res.status(403).json({ success: false, wishlistedCars: null });
        }
    } catch (error) {
        console.error('Error fetching wishlisted cars:', error);
        res.status(500).json({ success: false, wishlistedCars: null });
    }
};
