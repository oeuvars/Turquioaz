import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from "./routes/user-routes";
import adminRoutes from "./routes/admin-routes";

const app = express();

const port = process.env.PORT || 3000

app.use(cors({ credentials: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("this is home page!"));
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
