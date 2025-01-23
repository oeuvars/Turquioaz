import jwt from "jsonwebtoken";
import prisma from "../../../../db.config";
import bcrypt from "bcrypt";
import { Request, Response } from "express"

export const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   const user = await prisma.user.findUnique({ where: { email: email }});
   if (!user || user.is_verified === false) {
     res.json({ exists: false, sucess: false, message: "User not verified or don't exist", token: null });
   } else {
     const passwordCheck: boolean = await new Promise((resolve, reject) => {
       bcrypt.compare(password, user.password , async (error, result) => {
         if (error) reject(error);
         else resolve(result);
       })
     });
     if(passwordCheck === true) {
       const loginToken = jwt.sign({ email: email, name: user.name }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
       await prisma.user.update({where: {email: email}, data: {last_login: new Date().toLocaleDateString()}});
       res.json({ exists: true, success: true, message: "Logged in successfully", token: loginToken });
     } else {
       res.json({ exists: true, success: false, message: "Incorrect Password", token: null });
     }
   }
 };
