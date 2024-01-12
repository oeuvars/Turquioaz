import express from "express";
import jwt from "jsonwebtoken";

interface User {
   id: number;
   email: string;
   password: string;
}

const users: User[] = [
   { id: 1, email: 'oeuvars@gmail.com', password: 'oeuvars10' },
   { id: 2, email: 'ritamislive9@gmail.com', password: 'writtam10' }
];

export const login = (req: express.Request, res: express.Response) => {
   const { email, password } = req.body;
   const user = users.find((u) => u.email === email && u.password === password);
   if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
   }
   const token = jwt.sign({ userId: user.id, email: user.email }, process.env.hiddenKey as string, {expiresIn: '24h'});
   return res.status(200).send({message: 'Logged In',token: token});
};
