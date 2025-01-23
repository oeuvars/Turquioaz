import { Request, Response } from "express"
import jwt from "jsonwebtoken";
import prisma from "../../../config/db.config";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   const user = await prisma.admin.findUnique({ where: { email: email }});
   if (!user) {
      return res.status(401).json({ message: 'Admins only' });
   }
   const passwordCheck: boolean = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password , async (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
    });
    if(passwordCheck === true) {
      const loginToken = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET as string, { expiresIn: "24h" });
      await prisma.admin.update({where: {email: email}, data: {last_login: new Date().toLocaleDateString()}});
      res.json({ message: "Logged in successfully", token: loginToken });
    } else {
      res.json({ message: "Incorrect Password", token: null });
    }
};
