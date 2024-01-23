import express from "express";
import prisma from "../../../db/db.config";
import bcrypt from "bcrypt";

export const resetPassword = async (req: express.Request, res: express.Response) => {
   const { password, email } = req.body;
   const hashedPassword: string = await new Promise((resolve, reject) => {
     bcrypt.hash(password, 7, (err, hash) => {
       if (err) reject(err);
       else resolve(hash);
     });
   });
   if (hashedPassword) {
     await prisma.user.update({where: {email: email}, data: {password: hashedPassword, updated_at: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"})}});
     res.json({ message: "Password updated successfully" })
   } else {
     res.json({ message: "Could not update password" })
   }
 };
