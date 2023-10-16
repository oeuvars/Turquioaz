import express from "express";

const app = express();
import "dotenv/config";

import userRoutes from "./routes/userRoutes";

var cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("this is home page!"));

app.use("/user", userRoutes);

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
