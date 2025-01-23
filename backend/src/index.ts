import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from './routes/user-routes';
import adminRoutes from './routes/admin-routes';
import prisma from './config/db.config';

const app = express();

const port = process.env.PORT || 3000;

app.use(cors({ credentials: true }));

app.use(cors({
    origin: ['https://turquioaz.vercel.app', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

app.get('/', (req, res) => res.send('this is home page!'));
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
