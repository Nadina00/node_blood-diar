const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require('dotenv').config();

const authRouter = require("./routes/auth");
const productRouter = require("./routes/product")
const bloodDietRouter = require("./routes/bloodDiet")

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());

app.use(express.json());

app.use("/", authRouter);
app.use("/product", productRouter)
app.use("/bloodDiet", bloodDietRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
