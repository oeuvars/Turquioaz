import prisma from "../../../config/db.config";
import { Request, Response } from "express"

export const verifyRegistration = async (req: Request, res: Response) => {
   const {email, oneTimePass} = req.body;
   const otp = Number(oneTimePass)
   const user = await prisma.user.findUnique({ where: { email: email }});
   if (user?.otp === otp) {
     await prisma.user.update({where: {email: email}, data: {otp: null, is_verified: true}});
     res.json({ success: true, message: "User Verified"})
   } else {
     res.json({ success: false, message: "User does not exist"})
   }
 }
