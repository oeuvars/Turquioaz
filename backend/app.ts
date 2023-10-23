import express from "express";
import 'dotenv/config';
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();
const port = 4000;

var cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("this is home page!"));
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => console.log(`app listening on port ${port}!`));
