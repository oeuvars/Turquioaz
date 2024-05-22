import express from "express"
import jwt from "jsonwebtoken";
import { UserRequest } from "../types/UserRequest";
import { User } from "@prisma/client";

export const authentication = ( req: UserRequest, res: express.Response, next: express.NextFunction ) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.hiddenKey as string, (err, user) => {
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
