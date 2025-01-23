import jwt from 'jsonwebtoken';
import prisma from '../../../config/db.config';
import { UserRequest } from '../../../types';
import { Response } from "express"

export const rentCar = async (req: UserRequest, res: Response) => {
    if (!req.user) {
      return res.json({ success: false, message: 'User not found', token: null });
    }
    const { startDate, endDate, status } = req.body;
    const id = parseInt(req.params.id);
    const car = await prisma.model.findUnique({ where: { id: id } });
    if (car) {
        const user = await prisma.user.findUnique({ where: { email: req.user.email } });
        if (user) {
            const carID = car.id;
            const userID = user.id;
            const rentedCar = await prisma.rentedCar.create({
                data: {
                    carId: carID,
                    rentedtoId: userID,
                    startDate: startDate,
                    endDate: endDate,
                    status: status,
                },
            });
            const rentedCarID = rentedCar.id;
            const token = jwt.sign({ id: rentedCarID }, process.env.JWT_SECRET as string, {
                expiresIn: '24h',
            });
            res.json({ success: true, message: 'Car Rented successfully', token: token });
        } else {
            res.status(403).json({ success: false, message: 'User not found', token: null });
        }
    } else {
        res.status(404).json({ success: false, message: 'Car not found', token: null });
    }
};
