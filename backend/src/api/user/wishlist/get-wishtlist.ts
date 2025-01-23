import express from 'express';
import prisma from '../../../../db.config';
import { UserRequest } from '../../../types';
import { Response } from "express"

export const getWishlist = async (req: UserRequest, res: Response) => {
    try {
        const wishlist = await prisma.user.findUnique({
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

        if (wishlist) {
            res.json({ success: true, wishlist: wishlist.onWishlist });
        } else {
            res.status(403).json({ success: false, wishlist: null });
        }
    } catch (error) {
        console.error('Error fetching wishlisted cars:', error);
        res.status(500).json({ success: false, wishlist: null });
    }
};
