import express from "express"
import jwt from "jsonwebtoken";

interface Admin {
   email: string;
   name: string;
   password: string;
 }
 interface AdminRequest extends express.Request {
   admin: Admin;
 }

export const authentication = (
  req: AdminRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.hiddenKey as string, (err, admin) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.admin = admin as Admin;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
