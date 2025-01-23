import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { Admin } from "@prisma/client";
import { AdminRequest } from "../types";

export const authentication = ( req: AdminRequest, res: Response, next: NextFunction ) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET as string, (err, admin) => {
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
