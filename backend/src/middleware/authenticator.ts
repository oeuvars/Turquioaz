import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

interface User {
  email: string;
  name: string;
  password: string;
}
interface RequestWithUser extends Request {
  user: User;
}

export const authentication = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
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
