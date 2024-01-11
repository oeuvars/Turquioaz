import express from "express";
import jwt from "jsonwebtoken";
import prisma from "db/db.config";

interface User {
   email: string;
   name: string;
   password: string;
   is_Verified: boolean;
 }
 interface RequestWithUser extends express.Request {
   user: User;
 }

export const rentCar =  async (req: RequestWithUser, res: express.Response) => {
   const { startDate, endDate, status } = req.body;
   const id = parseInt(req.params.id);
   const car = await prisma.model.findUnique({where: {id: id}});
   if (car) {
     const user = await prisma.user.findUnique({where: {email: req.user.email}});
     if (user) {
       const carID = car.id;
       const userID = user.id;
       const rentedCar = await prisma.rentedCar.create({data: {carId: carID,rentedtoId: userID,startDate: startDate,endDate: endDate,status: status}});
       const rentedCarID = rentedCar.id;
       const token = jwt.sign({ id: rentedCarID },process.env.hiddenKey as string,{expiresIn: "24h"});
       res.json({ message: "Car Rented successfully", token });
     } else {
       res.status(403).json({ message: "User not found" });
     }
   } else {
     res.status(404).json({ message: "Car not found" });
   }
 };
