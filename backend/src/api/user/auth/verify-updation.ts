import { Request, Response } from "express"
import prisma from "../../../config/db.config";

export const verifyUpdation = async (req: Request, res: Response) => {
   const {email, oneTimePass} = req.body;
   const otp = Number(oneTimePass)
   const user = await prisma.user.findUnique({ where: { email: email }});
   if (user?.otp === otp) {
     await prisma.user.update({where: {email: email}, data: {otp: null, is_verified: true}});
     res.json({ message: "User Verified", verified: true })
   } else {
     res.json({ message: "User does not exist", verified: false })
   }
 }
