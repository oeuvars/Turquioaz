const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
var cors = require("cors");
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => res.send("this is home page!"));

app.use("/user", require("./routes/userRoutes"));

app.use("/admin", require("./routes/adminRoutes"));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "rentnride",
  })
  .then(console.log(`MongoDB connected`))
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
