import express from "express";
import prisma from "db/db.config";

export const verifyRegistration = async (req: express.Request, res: express.Response) => {
   const {email, oneTimePass} = req.body;
   const otp = Number(oneTimePass)
   const user = await prisma.user.findUnique({ where: { email: email }});
   if (user.otp === otp) {
     await prisma.user.update({where: {email: email}, data: {otp: null, is_verified: true}});
     res.json({ message: "User Verified"})
   } else {
     res.json({ message: "User does not exist"})
   }
 }
