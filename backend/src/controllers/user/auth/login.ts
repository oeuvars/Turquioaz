import express from "express";
import jwt from "jsonwebtoken";
import prisma from "db/db.config";
import bcrypt from "bcrypt";

export const login = async (req: express.Request, res: express.Response) => {
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
       const loginToken = jwt.sign({ email, role: "user" }, process.env.hiddenKey as string, { expiresIn: "24h" });
       await prisma.user.update({where: {email: email}, data: {last_login: new Date().toLocaleDateString()}});
       res.json({ exists: true, message: "Logged in successfully", token: loginToken });
     } else {
       res.json({ exists: true, message: "Incorrect Password", token: null });
     }
   }
 };
