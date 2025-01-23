import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { UserRequest } from "../types";
import { Response, NextFunction } from "express"

export const authentication = ( req: UserRequest, res: Response, next: NextFunction ) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user as User;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
